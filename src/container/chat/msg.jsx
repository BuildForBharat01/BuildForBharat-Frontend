import { useEffect, useState } from "react";

const MsgTile = ({
  msg,
  msgKey,
  currentlyPlaying,
  setCurrentlyPlaying,
  setToSpeak,
  utterance,
}) => {
  const [isPaused, setIsPaused] = useState(true);
  useEffect(() => {
    if (isPaused) {
      setToSpeak("");
    } else {
      setToSpeak(msg.message);
    }
  }, [isPaused]);

  if (utterance !== null) utterance.onend = () => setIsPaused(true);

  return (
    <div className={`msg ${msg.author !== "bot" ? "user-msg" : "bot-msg"}`}>
      {msg.message}
      {msg.author === "bot" && (
        <div
          className="msg-play-btn"
          onClick={() => {
            setCurrentlyPlaying(msgKey);
            setIsPaused(!isPaused);
          }}
        >
          {msgKey === currentlyPlaying && !isPaused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bi bi-pause"
              viewBox="0 0 16 16"
            >
              <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bi bi-play"
              viewBox="0 0 16 16"
            >
              <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default MsgTile;
