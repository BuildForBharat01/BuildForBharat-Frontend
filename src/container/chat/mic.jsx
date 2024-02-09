import React from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Mic = ({ setInputValue }) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // console.log(transcript);

  if (listening) setInputValue(transcript);
  if (!browserSupportsSpeechRecognition) {
    console.log("Browser doesn't support speech recognition.");
  }

  return (
    <div
      className="send-btn"
      onClick={() => {
        if (!listening) {
          SpeechRecognition.startListening();
        } else SpeechRecognition.stopListening();
      }}
    >
      {!listening ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-mic"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-soundwave"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5m12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"
          />
        </svg>
      )}
    </div>
  );
};

export default Mic;
