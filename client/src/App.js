import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "../src/components/navbar/Navbar.js";
import { Card } from "../src/components/card/Card";
import { posts } from "./data";
import { io } from "socket.io-client";


const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  console.log(user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <h2>Dosthi</h2>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
