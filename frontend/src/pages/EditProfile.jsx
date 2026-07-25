import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserNavbar from "../components/UserNavbar/UserNavbar";

import api from "../api/api";

import "./EditProfile.css";


function EditProfile(){


    const navigate = useNavigate();

    const token = localStorage.getItem("access");


    const [form,setForm] = useState({

        first_name:"",
        last_name:"",
        email:""

    });



    useEffect(()=>{

        loadProfile();

    },[]);



    const loadProfile = async()=>{


        try{

            const response = await api.get(

                "profile/",

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            setForm({

                first_name:response.data.first_name,

                last_name:response.data.last_name,

                email:response.data.email

            });


        }

        catch(error){

            console.log(error);

        }

    };





    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };






    const handleSubmit=async(e)=>{

        e.preventDefault();


        try{


            await api.put(

                "profile/",

                form,

                {

                    headers:{
                        Authorization:`Bearer ${token}`
                    }

                }

            );


            alert(
                "Profile updated successfully"
            );


            navigate("/profile");


        }


        catch(error){

            console.log(error);

            alert(
                "Update failed"
            );

        }


    };





    return(

        <>

        <UserNavbar/>


        <div className="edit-profile-container">


            <h1>
                Edit Profile
            </h1>


            <form onSubmit={handleSubmit}>


                <input

                name="first_name"

                value={form.first_name}

                onChange={handleChange}

                placeholder="First Name"

                />



                <input

                name="last_name"

                value={form.last_name}

                onChange={handleChange}

                placeholder="Last Name"

                />



                <input

                name="email"

                value={form.email}

                onChange={handleChange}

                placeholder="Email"

                />



                <button>

                    Save Changes

                </button>


            </form>


        </div>


        </>

    );

}


export default EditProfile;