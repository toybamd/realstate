import "./UserNavbar.css";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";


function UserNavbar(){

    const navigate = useNavigate();

    const { logout } = useContext(AuthContext);


    const handleLogout = ()=>{

        logout();

        navigate('/');

    };


    return(

        <nav className="user-navbar">


            <div className="user-nav-container">


                <Link to="/" className="brand">

    <img 
        src={logo}
        alt="Gift RealState Logo"
    />

    <span>
        Gift RealState
    </span>

</Link>


                <ul>


                    <li>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </li>


                    <li>
                        <Link to="/properties">
                            Properties
                        </Link>
                    </li>


                    


                    <li>
                        <Link to="/profile">
                            Profile
                        </Link>
                    </li>


                    <li>

                        <button
                        onClick={handleLogout}
                        >

                            Logout

                        </button>

                    </li>


                </ul>


            </div>


        </nav>

    );

}


export default UserNavbar;