require('dotenv').config()
const fs = require("fs")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Configuration, OpenAIApi } = require("openai");
const { writeDb, createDb, getCurrentDateTime, getSimilarTextFromDb, clearJsonFile, readDb } = require("./dbFunctions")
const fetch = require("node-fetch");

const path = require('path'); // Path for the static files + assets
let sentimentAvailable = false; // Flag to check if sentiment analysis is available

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


// Express API 
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(cors());



app.post("/api/oauth", async (req, res) => {
  const { data } = req.body
    try {
      if(req.method === "POST") {

        createDb(data.email);
        writeDb(data)
          return res.json({
            status: "Success"
          });
      }
      
      res.json({
        status: "success"
      })
    
    } catch (error) {
        console.log(error)
        res.json({
          error: error
        })
      }

});

app.post("/api/clearCache", async (req, res) => {
  const { data } = req.body;
  try {
    if (req.method === "POST" && data?.request === "delete") {
      const fileContent = fs.readFileSync(data?.file, "utf8");
      const parsedContent = JSON.parse(fileContent);
      
      if (Array.isArray(parsedContent) && parsedContent.length === 0) {
        res.json({
          status: "File already cleared",
        });
        return;
      }
      
      clearJsonFile(data?.file);
      res.json({
        status: "success",
      });
    }

  } catch (error) {
    console.log(error);
  }
});

app.get("/emotiv", (req, res) => {
  res.sendFile(path.join(__dirname, 'emotiv.html'));
});

app.post("/completions", async (req, res) => {
  const token = req?.headers?.authorization.split(' ')[1];
  const { temperature, ab } = req.body;

  if (!token || token !== process.env.API_KEY && !temperature || temperature !== 0.717828233 && !ab || ab !== 0.115) {
    throw Error;
  } else {
    try {
      const { lastThreeInteractions, inputToEmbedd, input, dbName} = req.body

      // embed the input
      const inputEmbeddingResponse = await openai.createEmbedding({       
        model: "text-embedding-ada-002",
        input: inputToEmbedd
      });
      const inputEmbedding = inputEmbeddingResponse.data.data[0].embedding;
      
      const context = getSimilarTextFromDb(inputEmbedding, `${dbName}.json`) // This function returns the four most similars interactions between the Student and the Teacher

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
          {role: "user", content: `The following is a dialogue between a low-intermediate student of Italian and a virtual Italian teacher. The teacher is helpful, creative, intelligent and very friendly. The teacher will answer the student's questions in detail and provide examples to clarify the concepts.\n\nStudent: Hi, who are you?\nTeacher: I am your virtual Italian teacher, John. I am capable of speaking and assisting in multiple languages, so if you prefer to communicate in a language other than English, I will do my best to accommodate. My goal is to be helpful, creative, intelligent, and friendly while guiding you in your Italian language learning. I will answer your questions in detail and provide examples to clarify any concepts you may be struggling with.\n${context}\n${lastThreeInteractions}\nStudent:${input}\nTeacher:`}
        ],
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0.6,
        stop: [ 'Teacher: ', 'Student: ' ],
      });

      const outputToEmbedd = `\nTeacher: ${response.data.choices[0].message.content}`;
      
      // embed output
      const outputEmbeddingResponse = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: outputToEmbedd
      });
      const outputEmbedding = outputEmbeddingResponse.data.data[0].embedding;
      
      const objToDb = {
        input: {
          text: inputToEmbedd,
          embedding: inputEmbedding,
          from: "user",
        },
        output: {
          text: outputToEmbedd,
          embedding: outputEmbedding,
          from: "bot"
        },
        time: getCurrentDateTime(),
      }
      
      writeDb(objToDb, `${dbName}.json`)
        
      res.json({
        completionText: response.data.choices[0].message.content,
        status: "success"
      })
      // completion OpenAI API call 'successful', sentiment available to analyze
      sentimentAvailable = true
    
    } catch (error) {
      console.log(error);
      writeDb(error, `error.json`)
        let e;
        if(error?.response?.status === 400) {
            e = 1;
        } else {
            e = 0;
        }
        res.json({
            error: e,
            errorMessage: error
        })
    }

  }
});



function getLastOutputToEmbedd(email) {
  const dbName = `${email}.json`
  const data = readDb(dbName); // This function should read the content of the database
  const lastEntry = data[data.length - 1]; // Get the last entry in the array
  const lastOutputToEmbedd = lastEntry.output.text; // Get the last outputToEmbedd
  return lastOutputToEmbedd;
}

const getEmailFromDb = () => {
  const rawData = fs.readFileSync("db.json");
  const parsedData = JSON.parse(rawData);
  return parsedData[0].email;
};

app.get("/getSentiment", async (req, res) => {
  try {
    if (sentimentAvailable) {
      const email = getEmailFromDb();
      // Get the last outputToEmbedd from the database (modify the function according to your database structure)
      const lastOutputToEmbedd = getLastOutputToEmbedd(email);

      // Get the sentiment using OpenAI API
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please analyze the sentiment of the following text as either angry, apologetic, gracious, happy, musing, neutral, sad, surprised. Only one word, all letters lowercase: ${lastOutputToEmbedd}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 50,
        top_p: 1,
        stop: ["\n"],
      });

      const sentiment = response.data.choices[0].message.content;

      res.json({
        sentiment: sentiment,
      });
      // Reset the sentimentAvailable flag to avoid multiple calls to the OpenAI API
      sentimentAvailable = false;
    } else {
      res.json({
        sentiment: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error processing sentiment analysis",
    });
  }
});

app.get("/getFolders", (req, res) => {
  const assetsPath = path.join(__dirname, "..", "src", "assets");
  fs.readdir(assetsPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Error reading assets directory:", err);
      res.status(500).send("Error reading assets directory");
      return;
    }

    const folders = files
      .filter((file) => file.isDirectory())
      .map((folder) => folder.name);
    res.json({ folders });
  });
});

app.listen(port, () => {
    console.log(`Example app ready`)
});
