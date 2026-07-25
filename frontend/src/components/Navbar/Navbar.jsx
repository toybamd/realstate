import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import Notifications from "../Notifications/Notifications";

import logo from "../../assets/images/logo.png";
function Navbar() {


    const navigate = useNavigate();


    const context = useContext(AuthContext);


    const user = context?.user;

    const logout = context?.logout;




    const handleLogout = () => {


        if(logout){

            logout();

        }


        navigate("/");


    };





    return (


        <nav className="navbar">


            <div className="nav-container">



                {/* Logo */}

                <Link to="/" className="brand">

    <img 
        src={logo}
        alt="Gift RealState Logo"
    />

    <span>
        Gift RealState
    </span>

</Link>







                {/* Navigation */}


                <ul className="nav-links">



                    <li>

                        <Link to="/">
                            Home
                        </Link>

                    </li>




                    <li>

                        <Link to="/properties">
                            Properties
                        </Link>

                    </li>




                    <li>

                        <Link to="/about">
                            About
                        </Link>

                    </li>




                    <li>

                        <Link to="/contact">
                            Contact
                        </Link>

                    </li>





                    {

                    user &&

                    <li>

                        <Link to="/dashboard">

                            Dashboard

                        </Link>


                    </li>


                    }





                    {/* Notification */}

                    {
    user && !user.is_staff &&
    <li>
        <Notifications/>
    </li>
}




                    {


                    !user ?


                    <>


                        <li>

                            <Link to="/login">

                                Login

                            </Link>

                        </li>



                        <li>

                            <Link to="/register">

                                Register

                            </Link>

                        </li>


                    </>


                    :


                    <li>


                        <button

                            className="logout-btn"

                            onClick={handleLogout}

                        >

                            Logout


                        </button>



                    </li>


                    }



                </ul>







                {/* CTA Button */}


                


            </div>


        </nav>


    );

}



export default Navbar;