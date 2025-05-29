import "./Chat.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChatInterface } from "../../interfaces/Interfaces";
import { formatDistanceToNow } from "date-fns";
import { auth } from "../../firebase/firebase-config";

const Chat = () => {
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      try {
        const res = await fetch(
          `https://api-fixdas.onrender.com/chats?loggedUserId=${user.uid}`
        );
        const resChats = await res.json();
        setChats(resChats);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.userToChatWith
      ?.toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase())
  );
  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6 d-flex justify-content-start align-items-center">
            <h2 className="main-color mb-0 pe-3">Chat</h2>
            <div className="number-of-chats d-flex align-items-center justify-content-center fw-bold">
              <span className="mb-0 text-center d-flex justify-content-center align-items-center">
                {filteredChats?.length}
              </span>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <img
              className="new-chat-icon"
              src={"./icons/chat-icon.svg"}
              alt=""
            />
          </div>
        </div>
        <div className="border border-bottom my-3"></div>

        <div className="col-12 text-center ">
          <div className="input-group mb-3">
            <span className="input-group-text custom-icon">
              <i className="fa-solid fa-magnifying-glass "></i>
            </span>
            <input
              type="text"
              className="form-control p-3 border-start-0"
              placeholder="Search conversation"
              aria-label="Search conversation"
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>
      {/* // chats */}
      <div className="container with-bottom-padding">
        {/* chat */}
        {loading && (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="row d-md-flex flex-md-row">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat: any) => (
              <div key={chat.id} className="col-12 col-md-6 p-md-2 ">
                <Link
                  to={`/chat/${chat.id}`}
                  className="text-decoration-none text-dark w-100"
                >
                  <div className="col-12  flex-md-column d-flex justify-content-center align-items-center shadow-sm">
                    <div className="col-3 d-flex justify-content-center align-items-center">
                      <div className="chat-img-container">
                        <img
                          src={`${chat.photoUrl}`}
                          alt=""
                          className="img-comment"
                        />
                      </div>
                    </div>
                    <div className="col-9 d-flex justify-content-between flex-md-column align-items-md-center mt-md-2 ">
                      <div className="col-8 d-flex flex-column align-items-md-center ">
                        <h6 className="mb-1">{chat.userToChatWith}</h6>
                        <p className="mb-0 comment mt-1 ">
                          {chat.specialty.join(", ")}
                        </p>
                      </div>
                      <div className="col-4 text-md-center">
                        <span className="text-secondary fw-bold chat-time-added">
                          {chat.messages.length > 0 &&
                          chat.messages[chat.messages.length - 1].timestamp
                            ? formatDistanceToNow(
                                new Date(
                                  chat.messages[
                                    chat.messages.length - 1
                                  ].timestamp
                                ),
                                { addSuffix: true }
                              )
                            : "Just now"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border d-md-none border-bottom my-3"></div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center lead">No conversation found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
