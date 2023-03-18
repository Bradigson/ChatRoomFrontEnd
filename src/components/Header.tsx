import { Link } from 'react-router-dom';
import '../assets/styles/Header.scss';
import _logo from '../assets/imgs/mylogo.png';


const Header = ()=>{
    return (
        <header>
            <div className='header_img '>
                <img src={_logo}/>
            </div>

            <div className=' header-menu'>

                <div>
                    {document.cookie.replace('user=', '') }
                </div>
                <div>
                    
                </div>


                <div className="btn-group ms-3">
                    <button className="menu" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                        <i className='bx bx-chevron-down'></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="#" className='Link'>Chat</Link>
                        </li>
                        <li>
                            <Link to="#" className='Link'>Users</Link>
                        </li>
                        <li>
                            <Link to="/" className='Link'>LogOut</Link>
                        </li>
                        
                    </ul>
                </div>

            </div>
            
        </header>
    )
}

export default Header;