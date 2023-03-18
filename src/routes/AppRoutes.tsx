import {Routes, Route} from 'react-router-dom';
import Chat from '../components/ChatRoom';
import Login from '../components/Login';
import { useEffect, useState } from 'react';

const  Rutas = ()=>{
    const [userName, setUserName] = useState<string>("");




    console.log(userName)
    return(
        <Routes>
            <Route index element={<Login onClick={(name : string)=>{setUserName(name);}}/>}/>
            <Route path='/chat' element={<Chat userName={userName}/>}/>
        </Routes>
    )
}


export default Rutas;