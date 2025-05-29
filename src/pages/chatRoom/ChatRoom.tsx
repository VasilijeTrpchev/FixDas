import { Link, useParams } from "react-router-dom";
import "./ChatRoom.css";
import { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { ChatInterface, Message } from "../../interfaces/Interfaces";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInfo, setUserInfo] = useState<ChatInterface>();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!id) return;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      }
    });

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`http://localhost:3001/chats/${id}`);
        const chatsRes = await res.json();

        setUserInfo(chatsRes);
        setMessages(chatsRes.messages || []);
      } catch (error) {
        console.error("Error fetching chat info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    return () => unsubscribe();
  }, [id]);

  const sendMessage = async () => {
    if (message.trim() === "") return;
    const newMessage = {
      id: crypto.randomUUID(),
      senderId: currentUserId,
      senderName: currentUser?.displayName || currentUser?.email,
      text: message,
      timestamp: new Date().toISOString(),
    };

    try {
      const updatedMessage = [...messages, newMessage];
      await fetch(`http://localhost:3001/chats/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessage }),
      });
      setMessages(updatedMessage as Message[]);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="verified-icon d-flex gap-2 justify-content-center align-items-center">
            <Link to={"/chat"}>
              <i className="fa-solid fa-chevron-left text-dark pe-2"></i>
            </Link>
            {userInfo?.photoUrl && (
              <Link to={`/profileHandyman/${userInfo?.userToChatWith}`}>
                <div className="img-user">
                  <img src={`${userInfo?.photoUrl}`} alt="Handyman" />
                </div>
              </Link>
            )}
            <p className=" mb-0 fw-bold">{userInfo?.userToChatWith}</p>
            <img src={"/icons/verified-icon.svg"} alt="" />
          </div>
          <div className="d-flex gap-3">
            <img src={"/icons/camera-icon.svg"} alt="" />
            <img src={"/icons/phone-icon.svg"} alt="" />
          </div>
        </div>
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {/* chat messages */}
      <div className="row">
        <div className="col-12 ">
          <div className="chat-box p-3">
            {messages?.map((msg) => (
              <div
                key={msg.id}
                className={`message-item  d-flex mb-3 ${
                  msg.senderId === currentUserId
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`message ${
                    msg.senderId === currentUserId
                      ? "msg-color text-white"
                      : "bg-light"
                  } p-2 rounded`}
                >
                  <p className="mb-0 fw-bold">{msg.senderName}</p>
                  <p className="mb-0 pb-2">{msg.text}</p>
                  <small className="mb-0 ">
                    sent at:
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row input-msg">
        <div className="col-10 px-0  d-flex justify-content-center align-items-center ">
          <div className="input-group">
            <span className="input-group-text custom-icon">
              <i className="fa-regular fa-face-smile text-primary"></i>
            </span>
            <input
              value={message}
              type="text"
              className="form-control p-3 border-start-0 border-end-0"
              placeholder="Your message"
              aria-label="Your message"
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <span className="input-group-text custom-icon">
              <i
                className="fa-regular fa-paper-plane text-primary"
                onClick={sendMessage}
              ></i>
            </span>
          </div>
        </div>
        <div className="col-2 px-0  ps-0  d-flex  justify-content-around justify-content-md-center  align-items-center  ">
          <i className="fa-solid fs-5 fa-paperclip text-primary pe-2  "></i>
          <i className="fa-solid fs-5 fa-microphone text-primary "></i>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
