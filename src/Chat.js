/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react';
import './chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import db from './firebase';
import {useStateValue} from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [seed,setSeed]=useState("");
    const [input,setInput]=useState("");
    const {roomId}=useParams();
    const [roomName,setroomName]=useState("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) => setroomName
            (snapshot.data().name));

                db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp","asc")
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => 
                    doc.data()))
                );

        }
    },[roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()* 5000))
    },[roomId]);

    const sendMessage = (e) =>{
        e.preventDefault();
        console.log("you typed",input);   
        
        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        
        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg `} />

                <div className="chat_header_info">
                    <h3>{roomName}</h3>
                    <p>last seen{""}
                    {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_header_right">
                    <IconButton>
                        <SearchIcon></SearchIcon>
                    </IconButton>
                    <IconButton>
                        <AttachFile></AttachFile>
                    </IconButton>
                    <IconButton>
                        <MoreVert></MoreVert>
                    </IconButton>
                </div>

            </div>
            <div className="chat_body">
                {messages.map((message) => (
                   <p className={`chat_body_message ${message.name === user.displayName && "chat_body_receiver"}`}>
                        
                        <span className="chat_body_message_name">{message.name}</span>{message.message}
                        <span className="chat_body_message_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                   </p> 
                ))}  
            </div>

            <div className="chat_footer">
                <InsertEmotionIcon />
                <form>
                    <input value={input} type="text" placeholder="Type a message" onChange={(e) => setInput(e.target.value)}></input>
                    <button onClick={sendMessage}>send message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
};

export default Chat
