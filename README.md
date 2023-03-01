# AI-Chatbot-Long-Term-Memory
This repository contains an advanced chatbot created with the OpenAI API that leverages long-term memory, advanced logic, embeddings, and databases to provide a truly unique user experience. Unlike traditional chatbots that simply respond to user input based on pre-defined rules or scripts, this chatbot can remember what you said in earlier conversations and build upon that knowledge to provide more personalized and relevant responses.

The chatbot's advanced logic capabilities also mean that it can handle more complex conversations and provide more nuanced responses, making it feel like you're chatting with a real person. Additionally, the chatbot uses embeddings and databases to achieve long-term memory, allowing it to retain information from previous conversations and use that information to inform future interactions.

To ensure a secure user experience, the chatbot also includes Know-Your-Customer (KYC) authentication through Google Login. This feature verifies the identity of users and helps prevent fraud and abuse.

One of the key features of this chatbot is its flexible prompts. For example, the default prompt is designed to make the chatbot act like an Italian teacher, but you can easily modify the prompt to fit any other use case you have in mind. This makes the chatbot highly versatile and adaptable to a wide range of use cases.

### Features:

- Uses OpenAI API for advanced natural language processing

- Long-term memory achieved through embeddings and databases

- Flexible prompts allow for easy customization to fit any use case

- Advanced logic capabilities enable more complex conversations and nuanced responses

- KYC authentication through Google Login ensures a secure user experience

- Can be easily integrated into various applications and platforms


If you're looking for a chatbot that goes beyond simple scripts and rules, and can provide a more personalized and engaging user experience while also maintaining the security of user information, this AI-powered chatbot with long-term memory, advanced logic, and KYC authentication is the perfect solution!

![image](https://pbs.twimg.com/media/FprkysxWAAEpY9r?format=jpg&name=large)


## Installation

To use the chatbot, you will first need to clone this repository to your local machine. You can do this by running the following command in your terminal:

`git clone https://github.com/FaustoNisida/AI-Chatbot-Long-Term-Memory thefolderofyourchoise`

`cd thefolderofyourchoise`

Next, you will need to install all of the dependencies for the client and server applications. To do this, first navigate to the client directory in your terminal:

`cd client`

Then, run the following command to install the client dependencies:

`npm install --force`

Note that the --force flag may be necessary if you encounter any errors during the installation process.

Next, navigate to the server directory in your terminal:

`cd ../server`

Then, run the following command to install the server dependencies:

`npm install`

After installing the dependencies, you will need to create an .env file in both the client and server directories containing the following environmental variables:

### Server .env

`OPENAI_API_KEY=<youropenaiapikey>`

Create your **openai key** [here](https://platform.openai.com/account/api-keys)

`API_KEY=<yourcustomapikeyforaccessingtheserver>`

**You can place whatever password or key of your choice in the `API_KEY` field.**

### Client .env

`VITE_Api_Key=<yourcustomapikeyforaccessingtheserver>`

`VITE_Google_Client_id=<yourgoogleclientid>`

Create a project and then a **google client id** [here](https://console.cloud.google.com/apis/credentials)

**In the `VITE_Api_Key` field you have to place the same password or key that you placed in the `API_KEY` enviromental variable of the client .env file**

Now you are ready to use the application

## Usage

### Starting the Server

Open a terminal window.

Navigate to the server directory by running the command `cd server`.

Start the server by running the command `npm run server`.

The server is now running on http://localhost:3000

By default, the chatbot is set up to act like an Italian teacher. However, you can easily modify the prompt to fit any other use case you have in mind. Simply **edit the prompt in line `97` of the index.js file in the server directory to include your desired prompt**.

### Starting the Client

Open a second terminal window, **without closing the terminal where is currently running the client**.

Navigate to the client directory by running the command `cd client`.

Start the client by running the command `npm run dev`.

The client and server are now running and you can access the application by visiting http://localhost:5173 in your web browser.

Enjoy the usage!

## Recommendations

It is recommended to store the embeddings and the inputs and outputs associated with those in a database that supports vector search, such as [Weaviate](https://weaviate.io/) or [Pinecone](https://www.pinecone.io/). While local JSON files(as i used for this project for the sake of time) can be used as a database for small-scale projects or prototyping, it is best practice to use specialized databases when dealing with embeddings and associated data.

By storing the embeddings and associated data in a vector search database, you can easily search and retrieve relevant information when needed, without having to rely on more complex and slower database queries. This can significantly improve the overall speed and efficiency of the chatbot, resulting in a better user experience.

Keep in mind that while these databases can offer significant benefits, they may also require additional setup and maintenance compared to traditional databases. Consider your specific needs and resources before deciding to use a vector search database.

## Contributing

If you'd like to contribute to this project, please feel free to submit a pull request with your proposed changes. We welcome all contributions, including bug fixes, new features, and improvements to the documentation.

## Contact

If you have any questions or feedback about this project, feel free to reach out to us:

- Email: **info@faustonisida.com**

We would love to hear from you and are happy to help with any issues you may encounter.

