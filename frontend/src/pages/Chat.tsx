import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import axios from "axios";
import "../styles/chat.scss";
import LogoutButton from "../components/LogoutButton";

const API_URL = import.meta.env.VITE_API_URL;

const socket: Socket = io("http://localhost:5000");

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Message {
  _id?: string;
  sender: string;
  receiver: string;
  text: string;
  timestamp?: string;
}

export default function Chat() {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [receiver, setReceiver] = useState<User | null>(null);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const userId = user.id;

  // --- Load Users ---
  useEffect(() => {
    if (!token) return;
    axios
      .get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => console.error("Failed to fetch users"));
  }, [token]);

  // --- Socket setup ---
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("receiveMessage", (message: Message) => {
      if (
        receiver &&
        (message.sender === receiver._id || message.receiver === receiver._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on("typing", (senderId: string) => {
      if (receiver && senderId === receiver._id) {
        setTypingUser(`${receiver.username} is typing...`);
        setTimeout(() => setTypingUser(""), 1500);
      }
    });

    socket.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("onlineUsers");
    };
  }, [userId, receiver]);

  // --- Load chat history when receiver changes ---
  useEffect(() => {
    if (receiver) {
      axios
        .get(`${API_URL}/messages/${receiver._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMessages(res.data))
        .catch(() => console.error("Failed to load messages"));
    }
  }, [receiver]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input || !receiver) return;
    const newMsg = { sender: userId, receiver: receiver._id, text: input };
    socket.emit("sendMessage", newMsg);
    // setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleTyping = () => {
    if (receiver) {
      socket.emit("typing", { sender: userId, receiver: receiver._id });
    }
  };

  return (
    <div className="chat-container">
      {/* Chat List */}
      <div className="chat-list">
        <div className="header">Chats <div>{JSON.parse(localStorage.getItem("user") || "{}").username} <LogoutButton /></div></div>
        <ul>
          {users.map((u) => (
            <li
              key={u._id}
              className={receiver?._id === u._id ? "active" : ""}
              onClick={() => setReceiver(u)}
            >
              {u.username}
              {onlineUsers.includes(u._id) && <span className="online-dot"></span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {receiver ? (
          <>
            <div className="messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  ref={i === messages.length - 1 ? scrollRef : null}
                  className={`message ${msg.sender === userId ? "sent" : "received"}`}
                >
                  {msg.text}
                  <div className="timestamp">
                    {msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </div>
                </div>
              ))}
              {typingUser && <div className="typing">{typingUser}</div>}
            </div>

            <div className="input-box">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleTyping}
                placeholder="Type message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="empty-chat">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}
