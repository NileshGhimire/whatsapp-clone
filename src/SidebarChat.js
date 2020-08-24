import React, {useEffect,useState} from 'react';
import './SidebarChat.css';
import {Avatar} from '@material-ui/core';
import db from './firebase';
import {Link} from 'react-router-dom';

 function SidebarChat({id,name,addNewChat}) {
    const [seed,setseed]= useState("");
   const [messages,setMessages]=useState([]);
    
   useEffect(() => {
        if(id) {
            db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) =>
            doc.data()))
            );
        }
    },[id]);

    useEffect(()=>{
        setseed(Math.floor(Math.random()* 5000));
    },[]);

   const createChat=() =>{
    const roomName = prompt("please enter name for chat");

    if(roomName){
        db.collection("rooms").add({
            name :roomName,

        });
    }
   };
   
        return !addNewChat ? (
            <Link to={`/rooms/${id}`}>
            <div className='sidebar_chat'>
            <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg `} />
            
            <div className="sidebar_chat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p> 
            </div>
            </div>
            </Link>
     ): (
        <div onClick={createChat} className="sidebar_chat">
            <h2>Add new chat</h2>
        </div>
    );
}
export default SidebarChat