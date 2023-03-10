import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown'

import '../index.css';
import"../App.css"

import sendicon from "../assets/sendicon.png";
import clearChat from "../assets/deleteicon.png"
import Sidebar from './Sidebar';
import { ChatContext } from './ChatContext';



function Welcome() {

  const {
    input,
    setInput,
    scrollDown,
    handleClear,
    handleSubmit,
    loading,
    // loadingCustomization,
    open,
    setOpen,
    // setCustomizedPrompt,
    // customizedInput,
    // setCustomizedInput,
    // handleCustomization,
    chatMessages
} = useContext(ChatContext)

  return (
    <div className="responsive px-4 pb-4 flex justify-center">
      {/* <Sidebar
        open={open}
        setOpen={setOpen}
        // handleCustomization={handleCustomization}
        loading={loading}
        // loadingCustomization={loadingCustomization}
        // customizedInput={customizedInput}
        // setCustomizedInput={setCustomizedInput}
        // setCustomizedPrompt={setCustomizedPrompt}
        classNames={` ${
          open ? "w-[30%] sidebar h-[100%] mr-8 overflow-y-scroll scrollable transition duration-600" : "hidden"
        } h-screen p-4 pt-4 relative transition duration-300 hidden-mobile`}
        fontSize={22}
      />
      <Sidebar
        open={open}
        setOpen={setOpen}
        // handleCustomization={handleCustomization}
        loading={loading}
        // loadingCustomization={loadingCustomization}
        // customizedInput={customizedInput}
        // setCustomizedInput={setCustomizedInput}
        // setCustomizedPrompt={setCustomizedPrompt}
        classNames={` ${
          open ? "w-full h-screen sidebar-mobile mr-8 z-10 fixed -top-0 left-0" : "hidden"
        } p-4 pt-4 duration-300 hidden-lg h-[screen]`}
        fontSize={20}
      /> */}
      <div className="scrollable rounded-lg h-[100%] shadow-md p-6 blue-glassmorphism w-full overflow-y-scroll">
          <div className="flex flex-col items-start flex-grow mb-6 min-h-[90%]">
            {chatMessages.map((message, index) => (
            <div key={index} className={`my-2 ${message.type === 'bot' ? 'text-gray-700' : 'text-gray-900'}`}>
              <p className="font-bold text-gray-600">{message.type === 'bot' ? 'Bot' : 'You'}</p>
              {message.type === 'bot' ? (
                <div ref={scrollDown}>
                  <ReactMarkdown 
                    children={message.text} 
                    className="text-white markdownRender" />
                </div>
              ) : (
                <p ref={scrollDown} className="text-white">{message.text}</p>
              )}
            </div>  
          ))}
          {loading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"/>
          )}
          </div>
        <div className="mt-4 relative bottom-0 left-0 w-full">
        <span className="absolute inset-y-0 left-0 flex items-center">
            <button
              className="cursor-pointer inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-red-500 hover:bg-gray-300"
              onClick={handleClear}
              disabled={loading}
            >
              <img className="w-5" src={clearChat} alt="clear icon" />
            </button>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center">
            <button
              className="cursor-pointer inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
              onClick={handleSubmit}
              disabled={loading}
            >
              <img className="w-5" src={sendicon} alt="send icon" />
            </button>
          </span>
          <input
            className="rounded-full py-2 pl-12 pr-12 block w-full appearance-none text-white leading-normal white-glassmorphism outline-none"
            type="text"
            placeholder="Write something"
            value={input}
            onChange={(event) => {
              setInput(event.target.value)
            }}
            onKeyUp={(e) => {
              if(loading === true) return;
              if(e.key === "Enter") {
                handleSubmit()
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
