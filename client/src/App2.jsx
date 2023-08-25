import React, { useEffect, useState } from 'react'
import IO from "socket.io-client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SOCKET_CLIENT = IO.connect("http://localhost:3001");


const App2 = () => {
    
    const [roomID, setRoomID] = useState("");
    const [ClientID, setClientID] = useState("");
    const [message, setMessage] = useState("");
    const [revMessage, setRevMessage] = useState([]);
    
    // client-side
    SOCKET_CLIENT.on("connect", () => {
        console.log(SOCKET_CLIENT.id); // ojIckSD2jqNzOqIrAGzL
        setClientID(SOCKET_CLIENT.id);
    });

    const roomIDFunc = () => {
        console.log("room clicked")
        if (roomID != "") {
            SOCKET_CLIENT.emit("send_roomID", roomID);
        } else {
            alert('Room id cant be empty');
            console.log('Room id cant be empty')
        }
    }

    const messageFunc = () => {
        if (roomID != "" && message != "") {
            console.log("message clicked");
            SOCKET_CLIENT.emit("send_message", { message, roomID })
        } else {
            alert("Message and Room ID cant be empty");
            console.log("Message and Room ID cant be empty");
        }
    }



    useEffect(() => {
        SOCKET_CLIENT.on("received_message", (data) => {
            toast("You got a new message!!!!");
            setRevMessage([...revMessage, data]);
        })
    }, [SOCKET_CLIENT])

    console.log(revMessage);

    return (
        <>
            <ToastContainer />
            <label htmlFor="roomID">
                <h1>Room ID -- {roomID}</h1>
                <i>Client ID -- {ClientID}</i>
                <p>RoomID : </p>
                <input type="text" placeholder='Enter Room ID...' onChange={(e) => setRoomID(e.target.value)} />
                <button onClick={roomIDFunc}>Enter Room</button>
            </label>

            <label htmlFor="message">
                <p>Message: </p>
                <input type="text" placeholder='Enter Message...' onChange={(e) => setMessage(e.target.value)} />
                <button onClick={messageFunc}>Send Message</button>
            </label>

            <hr />

            <h1>Message : </h1>
            <p>{revMessage}</p>
        </>
    )
}

export default App2