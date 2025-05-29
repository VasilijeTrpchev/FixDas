import { useNavigate } from "react-router-dom";
import { AvailableHandyman, ChatInterface } from "../interfaces/Interfaces";
import { getAuth } from "firebase/auth";

const useContactHandyman = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleContactClick = async (handyman: AvailableHandyman) => {
    if (!currentUser) navigate("/notAuth");
    try {
      const res = await fetch("https://api-fixdas.onrender.com/chats");
      const chats = await res.json();

      // Check if chat already exists for the handyman
      const existingChat = chats.find(
        (chat: ChatInterface) =>
          chat.loggedUserId === currentUser?.uid &&
          chat.userToChatWith === handyman.user
      );

      if (existingChat) {
        navigate(`/chat/${existingChat.id}`);
      } else {
        // Create new chat
        const newChat = {
          loggedUserId: currentUser?.uid,
          userToChatWith: handyman.user,
          role: "handyman",
          specialty: handyman.specialty,
          photoUrl: handyman.img,
          timestamp: new Date().toISOString(),
          messages: [],
        };

        const createRes = await fetch("https://api-fixdas.onrender.com/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newChat),
        });

        const createdChat = await createRes.json();
        navigate(`/chat/${createdChat.id}`);
      }
    } catch (error) {
      console.error("Error handling contact click:", error);
    }
  };
  return { handleContactClick };
};

export default useContactHandyman;
