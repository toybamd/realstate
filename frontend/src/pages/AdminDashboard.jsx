import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

import api from "../api/api";

import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

import "./AdminDashboard.css";


function AdminDashboard(){


    const [loading,setLoading] = useState(true);

    const [admin,setAdmin] = useState(false);

    const [username,setUsername] = useState("");





    useEffect(()=>{


        const token = localStorage.getItem("access");



        if(!token){

            setLoading(false);

            return;

        }




        api.get(

            "admin-check/",

            {

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }

        )


        .then(response=>{


            setAdmin(

                response.data.is_staff ||

                response.data.is_superuser

            );



            setUsername(

                response.data.username

            );



            setLoading(false);



        })



        .catch(error=>{


            console.log(error);

            setLoading(false);


        });



    },[]);








    if(loading){


        return(

            <h2 className="admin-loading">

                Loading Admin Panel...

            </h2>

        );

    }








    if(!admin){


        return <Navigate to="/" />;


    }









    return(


        <>



        <AdminNavbar />





        <div className="admin-dashboard">



            <div className="admin-container">






                <div className="admin-hero">


                    <h1>

                        Welcome Admin 👑

                    </h1>



                    <p>

                        Hello {username}, manage your real estate platform.

                    </p>



                </div>









                <div className="admin-cards">






                    <Link

                    to="/admin/properties"

                    className="admin-card"

                    >


                        <span>

                            🏠

                        </span>


                        <h2>

                            Properties

                        </h2>



                        <p>

                            Add, edit and manage homes.

                        </p>


                    </Link>









                    <Link

                    to="/admin/bookings"

                    className="admin-card"

                    >


                        <span>

                            📅

                        </span>



                        <h2>

                            Bookings

                        </h2>



                        <p>

                            Manage customer appointments.

                        </p>



                    </Link>









                    <Link

                    to="/admin/users"

                    className="admin-card"

                    >


                        <span>

                            👥

                        </span>



                        <h2>

                            Users

                        </h2>



                        <p>

                            Manage registered customers.

                        </p>



                    </Link>





                </div>






            </div>



        </div>





        </>


    );


}


export default AdminDashboard;