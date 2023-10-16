import './Navbar.css'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from "src/redux/request/authRequest";
import useAxiosJWT from 'src/hooks/useAxiosJWT';
import { useState } from 'react';
import { getUser } from 'src/redux/reducer/authSlice';
import { toggleSidebar } from 'src/redux/store/homeSlice';

const Navbar = () => {
    const currentUser = useSelector(getUser)
    const dispatch = useDispatch();
    const axiosJWT = useAxiosJWT();

    const [isDarkMode, setIsDarkMode] = useState(false)
    const bigScrren = window.innerWidth > 768

    const handleCloseSidebar = () => {
        dispatch(toggleSidebar())
    }

    const handleDarkMode = () => { 
        document.body.classList.toggle('dark') 
        setIsDarkMode(prev => !prev)
    }

    const handleLogout = () => {
        logOut(axiosJWT, dispatch);
    }
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo">
                    {!bigScrren && 
                        <MenuIcon onClick={() => handleCloseSidebar()} />
                    }

                    <div className="navbar-logo-item">
                        <img src='/imgs/tuyensinh.png' alt="logo" />
                        <div className='navbar-logo-title'><p>TƯ VẤN NGUYỆN VỌNG</p> <p> TUYỂN SINH 10 TP.HCM</p></div>
                    </div>
                </div>

                <div className="navbar-info">
                    {!isDarkMode
                        ? <LightModeIcon titleAccess='Ban đêm' onClick={() => handleDarkMode()} />
                        : <DarkModeIcon titleAccess='Ban ngày' onClick={() => handleDarkMode()} />
                    }

                    <Link onClick={() => window.location.href = "mailto:nhan.kun2612@gmail.com?subject=Reg:Liên Hệ"}>
                        <ContactMailIcon titleAccess='Liên hệ' />
                    </Link>

                    <div className="navbar-dropdown">
                        <img src="/imgs/icon-user-login.png" alt="logo" />
                        <div className="navbar-dropdown-content">
                            {currentUser ?
                            <>
                                <Link className='navbar-dropdown-link navbar-dropdown-linked'>{currentUser.username}</Link>
                                <Link to='/admin/logout' className="navbar-dropdown-link" onClick={() => handleLogout()}>Đăng xuất</Link>
                            </> :
                            <>
                                <Link to="/admin/login" className="navbar-dropdown-link">Đăng nhập</Link>
                                <Link to="/admin/register" className="navbar-dropdown-link">Đăng ký</Link>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;