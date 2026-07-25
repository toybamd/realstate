import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";

import auth from "../api/auth";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({

        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(form.password !== form.confirm_password){

            alert("Passwords do not match.");

            return;

        }

        try{

            await auth.post(

                "register/",

                {

                    first_name: form.first_name,

                    last_name: form.last_name,

                    username: form.username,

                    email: form.email,

                    password: form.password,

                }

            );

            alert("Registration successful!");

            navigate("/login");

        }

        catch(error){

            console.log(error);

            alert("Registration failed.");

        }

    };

    return(

        <section className="register-page">

            <div className="register-overlay"></div>

            <div className="register-card">

                <div className="register-logo">

                    <FaHome/>

                    <h2>Gift Real Estate</h2>

                </div>

                <h1>Create Account</h1>

                <p>

                    Join us and find your dream home.

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="name-row">

                        <input

                            name="first_name"

                            placeholder="First Name"

                            value={form.first_name}

                            onChange={handleChange}

                            required

                        />

                        <input

                            name="last_name"

                            placeholder="Last Name"

                            value={form.last_name}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <input

                        name="username"

                        placeholder="Username"

                        value={form.username}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={form.email}

                        onChange={handleChange}

                        required

                    />

                    <div className="password-group">

                        <input

                            type={showPassword ? "text":"password"}

                            name="password"

                            placeholder="Password"

                            value={form.password}

                            onChange={handleChange}

                            required

                        />

                        <span

                        onClick={()=>setShowPassword(!showPassword)}

                        >

                            {

                                showPassword

                                ?

                                <FaEyeSlash/>

                                :

                                <FaEye/>

                            }

                        </span>

                    </div>

                    <div className="password-group">

                        <input

                            type={showConfirm ? "text":"password"}

                            name="confirm_password"

                            placeholder="Confirm Password"

                            value={form.confirm_password}

                            onChange={handleChange}

                            required

                        />

                        <span

                        onClick={()=>setShowConfirm(!showConfirm)}

                        >

                            {

                                showConfirm

                                ?

                                <FaEyeSlash/>

                                :

                                <FaEye/>

                            }

                        </span>

                    </div>

                    <button

                    className="register-btn"

                    type="submit"

                    >

                        Create Account

                    </button>

                </form>

                <div className="login-link">

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default Register;