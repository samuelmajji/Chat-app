import React, { useEffect, useState } from "react";

const ChatLayout = () => {
  const [users, setUsers] = useState([]);
  const [chat, setUserChat] = useState([]);
  const [id, setId] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const handleClick = (id) => {
    fetch(`http://localhost:8000/api/messages/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setId(id);
        setUserChat(() => [...data]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const sendMessage = () => {
    if (inputMessage.trim() === "") {
      return; // Don't send empty messages
    }

    fetch(`http://localhost:8000/api/messages/send/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputMessage }), // Send the message as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        return response.json();
      })
      .then((data) => {
        setUserChat((prevChat) => [...prevChat, data]);
        setInputMessage(""); // Clear the input field after sending
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/users", {
      method: "GET",
      credentials: "include", // Ensures cookies are sent with the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers([...data]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="w-4/5 h-3/4 bg-white flex shadow-lg rounded-lg overflow-hidden my-40">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 p-4">
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleClick(user._id)}
                className={`relative flex flex-col items-center mb-2 p-2 rounded-lg cursor-pointer ${
                  id === user._id ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <img
                  src={user.profilePic}
                  alt="Chat Avatar"
                  className="w-10 h-10 rounded-full mb-1"
                />
                <div className="text-center">
                  <span className="text-sm font-semibold text-white">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400 block">
                    Last message preview...
                  </span>
                </div>
                {id === user._id && (
                  <div className="w-full h-1 bg-yellow-500 mt-2"></div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 flex flex-col justify-between bg-gradient-to-r from-purple-500 to-pink-500 p-4">
          <div className="flex-1 overflow-y-auto">
            {chat.map((chat) => (
              <div key={chat._id}>
                {chat.receiverId !== id ? (
                  <div className="chat chat-start mb-2">
                    <div className="chat-bubble chat-bubble-primary">
                      {chat.message}
                    </div>
                  </div>
                ) : (
                  <div className="chat chat-end mb-2">
                    <div className="chat-bubble chat-bubble-success">
                      {chat.message}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-secondary w-full"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="btn btn-secondary mt-2 w-full"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
