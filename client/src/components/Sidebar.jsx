import { FiSettings } from "react-icons/fi"
import { AiOutlineClose } from "react-icons/ai"
import sendicon from "../assets/sendicon.png";
import { useContext } from "react";
import { ChatContext } from "./ChatContext";
import "../index.css";
import"../App.css"



const Sidebar = ({ 
    classNames, fontSizeFirst, fontSize,
    positionIcon, viewport
}) => {

    const {
        loading,
        // loadingCustomization,
        open,
        setOpen,
        // setCustomizedPrompt,
        // customizedInput,
        // setCustomizedInput,
        // handleCustomization
    } = useContext(ChatContext)
    
    return(
      <>
        <div
          className={classNames}
        >
          {open && (
          <>
            <AiOutlineClose
              fontSize={fontSize} 
              className={`absolute cursor-pointer right-3 top-4 text-white transition duration-300 ease-in-out"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center ml-2">
              <h1
                className={`fontStyle text-white font-medium text-xl font-serif ${
                  !open && "scale-0"
                }`}
              >
                SETTINGS
              </h1>
            </div>
            <div className={`flex flex-col justify-center p-2 hover:bg-light-white text-gray-300 text-sm items-start gap-y-10 gap-x-4 mt-10`}>
              {/* <span className="absolute top-[472px] right-6 flex items-center">
                <button
                  className="cursor-pointer inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
                  onClick={handleCustomization}
                  disabled={loading && loadingCustomization}
                >
                  <img className="w-5" src={sendicon} alt="send icon" />
                </button>
              </span> */}
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              {/* <textarea
                type="text"
                placeholder='E.g., Act as a motivational coach named John who helps people to get positive results in their life. I am seeking guidance and motivation to help me overcome my current challenges and achieve my goals.'
                className='white-glassmorphism text-white placeholder:text-gray-500 w-full p-1 h-96 pb-12 resize-none'
                value={customizedInput}
                onChange={(e) => setCustomizedInput(e.target.value) }
                onKeyUp={(e) => {
                  if(loadingCustomization === true) return
                  if(e.key === "Enter") {
                    handleCustomization()
                  }
                }}
              />
              <button
                onClick={() => setCustomizedPrompt("Act as an AI created by Fausto Nisida")}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
              > 
                Reset the bot
              </button> */}
            </div>

          </>
          )}
        </div>
      </>
    );
}


export default Sidebar;