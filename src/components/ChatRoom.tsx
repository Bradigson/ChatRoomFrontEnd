import { useState, useEffect, ChangeEvent, useRef } from "react";
import io from 'socket.io-client';
import { messageModel } from "../services/Models";
import '../assets/styles/Chat.scss';
import validator from "validator";
import Header from "./Header";

const socket = io('https://chat-backend-new-6i6v.onrender.com/');
//const socket = io('http://localhost:5000/');


type userType= {
    userName : string 
}
const Chat = ({userName}:userType)=>{

    let now = new Date();
    
    let day = now.getDate();
    let month = now.getMonth()+1;
    let year = now.getFullYear();

    let hour = now.getUTCMonth();
    let minnutes = now.getMinutes();

    let hours = hour + ':' +  minnutes;
    


    let date:string = day + '/' + month + '/' + year;

    const [message, setMessage] = useState<messageModel>({
        userName : document.cookie.replace('user=', ''),
        userMessage : "",
        dateTime :  date + ' ' + hours
    });
    const [allMessage, setAllMessage] = useState<messageModel[]>([]);
    
    const dummy = useRef<HTMLDivElement | null>(null);

    const [name, setName] = useState<string>("");
    const [openSend, setOpenSend] = useState<boolean>(false);
    


    const handleInputMessage = (e:ChangeEvent<HTMLInputElement | HTMLFormElement>)=>{
        setMessage({
            ...message,
            [e.target.name]: e.target.value
        })
    }


    const handleOpenSend = ()=>{
        setOpenSend(!openSend);
    }


    const handleSendMessage = async(e:any)=>{
        e.preventDefault();

        if(!validator.isEmpty(message.userMessage)){
            await socket.emit('message_sent', message);
            message.userMessage = "";
            dummy.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth'});
        }
        

    }


    useEffect(()=>{

        fetch("https://chat-backend-new-6i6v.onrender.com/readMessage")
        .then(data=> data.json())
        .then(data=> setAllMessage(data))
        .catch(err=> console.log(err))
        
    },[allMessage]);


    return(
        <section className="chat">
            <Header/>
   

            <div className="chat_message-container" >

                
                <div className="chat_message-container_all-message" >
                    <div className="message-content" ref={dummy}>
                        {
                            allMessage.map((msg, index)=>{
                                return(
                                    <div className={msg.userName === document.cookie.replace('user=', '') ? 
                                    "message_container_right" : "message_container_left"}  key={index}>
                                        <div className={msg.userName === document.cookie.replace('user=', '') ? "message-right" : "message-left"}>
                                            {msg.userMessage}
                                            <div className="message-time">
                                                <span>{msg.dateTime.slice(1,9)} {" :"} {msg.dateTime.slice(9,14)}</span>
                                            </div>
                                        </div>
                                        <div className="user-name" title={msg.userName}>
                                            {msg.userName.slice(0,1)}
                                        </div>
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                </div>


                <div className="chat_message-container_buttons" id="from-ipad-desktop">
                    <div id="buttons-container">
                        <i className='bx bx-plus'></i>
                        <input type="text" placeholder="" className="chat_message-container_buttons_input"  name="userMessage" value={message.userMessage} onChange={handleInputMessage}/>
                        <i className='bx bx-camera'></i>
                        
                        {
                            message.userMessage.length > 1 ? (
                                <i className='bx bxl-telegram' onClick={handleSendMessage}></i>
                            ) : (
                                <i className='bx bx-microphone'></i>
                            )
                        }
                    </div>
                </div>
               
            </div> 
           
        </section>
    )
}


export default Chat;