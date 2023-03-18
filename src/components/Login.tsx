import '../assets/styles/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { handleUnAvailable } from '../assets/Alerts/alerts';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { ILogin } from '../services/Models';
import validator from 'validator';
import { handleWelcome } from '../assets/Alerts/alerts';
import imglogin from '../assets/imgs/login_logo.svg';




type eventUsername = {
    onClick : (userName:string)=>void
}

const Login = ({onClick}:eventUsername)=>{

    const [login, setLogin] =useState<ILogin>({
        username : "",
        password : ""
    });
    const [errorUserName, setErrorUserName] = useState<string>();
    const [errorUserPassword, setErrorUserPassword] = useState<string>();
    const navigate = useNavigate();
    
    const handleUserName = (e:ChangeEvent<HTMLInputElement>)=>{
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    }

    

    const handleUserPassword = (e:ChangeEvent<HTMLInputElement>)=>{
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })

    }



    const handleSocialMedia = (e:any)=>{
        e.preventDefault();
        handleUnAvailable();
    }


    const handleLogin = (e:any)=>{
        e.preventDefault();

        setErrorUserName("");
        setErrorUserPassword("");

        if(validator.isEmpty(login.username)){
            setErrorUserName("usuario incorrecto");
        }else if(validator.isEmpty(login.password)){
            setErrorUserPassword("password incorrecto");
        }else{

            if(validator.isStrongPassword(login.password))
            {
                document.cookie = `user=${login.username};  path=/; samesite=strict`;
                handleWelcome(login.username);
                onClick(document.cookie.replace('user=', ''));
                navigate('/chat');
            }else{
                setErrorUserPassword("weak password");
            }
            
            
           
        }
    }

    return(
        <div className='form-container'>


           <div className='form-contain-content'>

                <div className='form-container_img'>
                    <img src={imglogin}/>
                </div>


                <form >
                    <div className='form-content'>

                        <div className='text-center'>
                            <b>
                                LOG IN
                            </b>
                        </div>
                        <div className='form-container_input'>
                            <input type="text" className='form-control' name="username" value={login.username} onChange={handleUserName} placeholder="Any userName"/>
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className='form-container_input'>
                            <input type="password" className='form-control' name="password" value={login.password} onChange={handleUserPassword} placeholder="Any passWord"/>
                            <i className='bx bxs-lock' ></i>
                        </div>
                        <div className='form-button_login'>
                            <button onClick={(e)=> handleLogin(e)}>LOG IN</button>
                        </div>
                        
                        <div className='text-center text-danger'>
                            {errorUserName}{errorUserPassword}
                        </div>

                    </div>
                    
                </form>

           </div>
            
        </div>
    )
}



export default Login;