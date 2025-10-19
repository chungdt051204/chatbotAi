import { useRef, useState } from "react";
import "./ChatBot.css";
export default function ChatBot() {
  const [message, setMessage] = useState([]);
  const [clicked, setClicked] = useState(false);
  const user = useRef();

  const handleClick = () => {
    const message = user.current.value.trim();
    if (message.length > 0) {
      //Thêm tin nhắn mới mà ko xóa tin nhắn cũ
      setMessage((prev) => [...prev, { sender: "user", text: message }]);
      user.current.value = "";
    }
    fetch("https://serverchatbotai-2.onrender.com/model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage: message }),
     
    })
      .then((res) => res.json())
      .then((data) =>
        setMessage((prev) => [...prev, { sender: "model", text: data }])
      )
      .catch();
  };
  return (
    <>
      {clicked ? (
        <button
          className="icon-chatbot"
          onClick={() => setClicked((prev) => !prev)}
        >
          <i class="fa-brands fa-facebook-messenger"></i>
        </button>
      ) : (
        <div className="chat-window">
          <button className="btn-close" onClick={() => setClicked(true)}>
            X CLOSE
          </button>
          <div className="chat">
            {message.length > 0 &&
              message.map((value, index) => {
                return (
                  <div
                    key={index}
                    className={value.sender === "user" ? "user" : "model"}
                  >
                    <p>{value.text}</p>
                  </div>
                );
              })}
          </div>
          <div className="input-area">
            <input
              id="user-message"
              type="text"
              ref={user}
              placeholder="Nhập bất cứ thứ gì"
            />
            <button id="btn-send" onClick={handleClick}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
