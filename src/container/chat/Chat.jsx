import "./chat.css";
import logo from "../../assets/shoptalk.png";
import { useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import MsgTile from "./msg";

const Chat = (props) => {
  const [toSpeak, setToSpeak] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState(-1);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (toSpeak !== "") {
      const u = new SpeechSynthesisUtterance(toSpeak);
      setUtterance(u);
      synth.speak(u);
    }
    return () => {
      synth.cancel();
    };
  }, [toSpeak]);

  const openai = new OpenAI({
    apiKey: process.env["REACT_APP_OPENAI_API_KEY"], // This is the default and can be omitted
    dangerouslyAllowBrowser: true,
  });

  // const openai = new OpenAIApi(configuration);
  const msgScrollerRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [productData, setProductData] = useState("");
  const [messages, setMessages] = useState([
    {
      author: "bot",
      message: "Hey, How can I help you?",
    },
  ]);
  useEffect(() => {
    // Scroll to the bottom when messages change
    const product = localStorage.getItem("product");
    setProductData(product);
    if (msgScrollerRef.current) {
      msgScrollerRef.current.scrollTop = msgScrollerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    try {
      setMessages((prev) => [
        ...prev,
        { author: "user", message: inputValue },
        { author: "bot", message: "Thinking..." },
      ]);
      setInputValue("");

      const full_prompt = `The product details are as follows:\n\n${productData}\n\nNow answer the question: ${inputValue}`;

      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: full_prompt }],
        model: "gpt-3.5-turbo",
      });

      setMessages((prev) => {
        const reply = chatCompletion.choices[0].message.content;
        // Replace the loading message with the actual reply
        const updatedMessages = [...prev];
        updatedMessages.pop(); // Remove the loading message
        return [...updatedMessages, { author: "bot", message: reply }];
      });
    } catch (error) {
      console.log(error);
      // Handle errors if necessary
    }
  };

  return (
    <div className="Chat">
      <div className="chat-nav">
        <div className="chat-logo-wrapper">
          <img src={logo} alt="" className="chat-nav-logo" />
          <div className="chat-nav-title">ShopTalk Bot</div>
        </div>
        {props.closeBtn && (
          <div className="close-btn" onClick={() => props.setShowChat(false)}>
            &#x2716;
          </div>
        )}
      </div>
      <div className="msg-scroller" ref={msgScrollerRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg-wrapper ${
              msg.author !== "bot" ? "user-msg" : "bot-msg"
            }`}
          >
            <MsgTile
              msg={msg}
              msgKey={i}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
              setToSpeak={setToSpeak}
              utterance={utterance}
            />
          </div>
        ))}
      </div>
      <div className="chat-bottom">
        <input
          className="chat-input"
          placeholder="Ask queries...."
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="send-btn" onClick={() => handleSend()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Chat;
