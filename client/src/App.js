import React, { useEffect, useState } from "react"
import io from "socket.io-client";

const SocketClient = io.connect("http://localhost:3001");

function App() {

  const [roomID, setRoomID] = useState();
  const [message, setMessage] = useState();
  const [revMessage, setRevMessage] = useState();

  const roomIDFunc = () => {
    SocketClient.emit("roomID", {roomID : roomID})
    console.log("RoomID clicked");
  }
  const sendMsgFunc = () => {
    SocketClient.emit("send_message", {message : message, roomID: roomID})
    console.log("Send clicked");
  }


  useEffect(()=> {
    SocketClient.on("received_meesage", (data)=> {
      setRevMessage(data);
    })
  }, [SocketClient])

  return (
    <>
      <input type="text" placeholder="Room Id..." onChange={(e) => setRoomID(e.target.value)} />
      <button onClick={roomIDFunc}>Send</button>
      <br/>
      <hr/>
      <input type="text" placeholder="Message..." onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMsgFunc}>Send</button>

      <h1>Messages: </h1>
      <p>{revMessage}</p>
    </>
  );
}

export default App;
