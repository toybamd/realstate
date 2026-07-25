import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";

import auth from "../api/auth";
import { AuthContext } from "../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await auth.post(
                "token/",
                form
            );

            login(
    response.data.access,
    response.data.refresh
);

// Check user role
const adminResponse = await auth.get(
    "admin-check/",
    {
        headers: {
            Authorization: `Bearer ${response.data.access}`
        }
    }
);

if (adminResponse.data.is_staff || adminResponse.data.is_superuser) {

    navigate("/admin-dashboard");

} else {

    navigate("/dashboard");

}

        } catch (error) {

            alert("Invalid username or password.");

        }

    };

    return (

        <section className="login-page">

            <div className="login-overlay"></div>

            <div className="login-card">

                <div className="login-logo">

                    <FaHome />

                    <h2>RealState</h2>

                </div>

                <h1>Welcome Back</h1>

                <p>

                    Login to continue exploring modern homes.

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-group password-group">

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-icon"
                        >

                            {showPassword ? <FaEyeSlash /> : <FaEye />}

                        </span>

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >

                        Login

                    </button>

                </form>

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default Login;