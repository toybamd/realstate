import "./AdminNavbar.css";
import logo from "../../assets/images/logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import {
    FaHome,
    FaBuilding,
    FaCalendarAlt,
    FaUsers,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

import Notifications from "../Notifications/Notifications";

function AdminNavbar() {

    const navigate = useNavigate();

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <nav className="admin-navbar">

            <div className="admin-nav-container">


                {/* Logo */}

                <Link
                    to="/admin-dashboard"
                    className="brand"
                >

                    <img
                        src={logo}
                        alt="Gift RealState Logo"
                    />

                    <span>
                        Admin Panel
                    </span>

                </Link>


                {/* Navigation */}

                <div className="admin-links">

                    <Link to="/admin-dashboard">

                        <FaHome />

                        Dashboard

                    </Link>


                    <Link to="/admin/properties">

                        <FaBuilding />

                        Properties

                    </Link>


                    <Link to="/admin/bookings">

                        <FaCalendarAlt />

                        Bookings

                    </Link>


                    <Link to="/admin/users">

                        <FaUsers />

                        Users

                    </Link>


                    <Link to="/profile">

                        <FaUser />

                        Profile

                    </Link>

                </div>


                {/* Right Side */}

                <div className="admin-actions">

                    <Notifications />

                    <button
                        onClick={handleLogout}
                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default AdminNavbar;