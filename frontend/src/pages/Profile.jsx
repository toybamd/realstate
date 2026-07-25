import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";

import api from "../api/api";

import "./Profile.css";


function Profile(){
    const navigate = useNavigate();

    const token = localStorage.getItem("access");


    const [profile,setProfile] = useState(null);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        loadProfile();

    },[]);



    const loadProfile = async()=>{


        try{


            const response = await api.get(

                "profile/",

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );


            setProfile(response.data);


        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }


    };





    if(loading){

        return(

            <>

            <Navbar/>

            <h2 className="loading">

                Loading Profile...

            </h2>

            </>

        );

    }





    return(

        <>


        <Navbar />



        <section className="profile-page">


            <div className="profile-card">


                <div className="profile-avatar">

                    👤

                </div>



                <h1>

                    {profile.username}

                </h1>



                <div className="profile-info">


                    <p>

                        <b>First Name:</b>

                        {" "}

                        {profile.first_name || "Not provided"}

                    </p>



                    <p>

                        <b>Last Name:</b>

                        {" "}

                        {profile.last_name || "Not provided"}

                    </p>



                    <p>

                        <b>Email:</b>

                        {" "}

                        {profile.email}

                    </p>


                </div>



               <button

                   className="edit-profile"

                    onClick={()=>navigate("/profile/edit")}

                       >

                      Edit Profile

                    </button>



            </div>



        </section>



        <Footer />


        </>

    );

}


export default Profile;