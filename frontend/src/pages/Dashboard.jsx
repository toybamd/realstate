import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import UserNavbar from "../components/UserNavbar/UserNavbar";
import Notifications from "../components/Notifications/Notifications";
import Footer from "../components/Footer/Footer";

import { AuthContext } from "../context/AuthContext";

import api from "../api/api";

import "./Dashboard.css";


function Dashboard(){

    const { user } = useContext(AuthContext);

    const token = localStorage.getItem("access");


    const [bookings,setBookings] = useState([]);

    const [favorites,setFavorites] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        loadData();

    },[]);



    const loadData = async()=>{

        await Promise.all([
            loadBookings(),
            loadFavorites()
        ]);

        setLoading(false);

    };



    const loadBookings = async()=>{

        try{

            const response = await api.get(
                "my-bookings/",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setBookings(response.data);

        }

        catch(error){

            console.log(error);

        }

    };




    const loadFavorites = async()=>{

        try{

            const response = await api.get(
                "favorites/",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            setFavorites(response.data);

        }

        catch(error){

            console.log(error);

        }

    };





    const removeFavorite = async(id)=>{

        try{

            await api.delete(
                `favorites/${id}/`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            setFavorites(
                favorites.filter(
                    item=>item.id !== id
                )
            );

        }

        catch(error){

            console.log(error);

        }

    };





if (!token) {
    return <Navigate to="/login" replace />;
}

    if(loading){

        return(

            <>

            <UserNavbar />

            <h2 className="loading">

                Loading Dashboard...

            </h2>

            </>

        );

    }



    return(

        <>

        <UserNavbar />


        <section className="dashboard">


            <div className="dashboard-container">



                {/* HERO */}

                <div className="dashboard-hero">


                    <div>

                    <h1>

                    Welcome back,
                    <br/>
                    {user?.username} 👋

                    </h1>


                    <p>

                    Manage your dream homes,
                    bookings and favorites.

                    </p>


                    </div>


                </div>




                {/* STATS */}


                <div className="dashboard-cards">


                    <div className="dash-card">

                        <span>
                            📅
                        </span>

                        <h3>
                            My Bookings
                        </h3>

                        <strong>
                            {bookings.length}
                        </strong>

                    </div>



                    <div className="dash-card">

                        <span>
                            ❤️
                        </span>

                        <h3>
                            Favorites
                        </h3>

                        <strong>
                            {favorites.length}
                        </strong>

                    </div>




                    <div className="dash-card">

                        <span>
                            🏠
                        </span>

                        <h3>
                            Explore Homes
                        </h3>


                        <Link to="/properties">

                            Browse Properties

                        </Link>


                    </div>



                </div>





                {/* BOOKINGS */}


                <div className="dashboard-section">


                    <h2>
                        📅 Recent Bookings
                    </h2>


                    {

                    bookings.length===0

                    ?

                    <p>
                    No bookings yet.
                    </p>


                    :


                    bookings.map((booking)=>(


                    <div
                    className="booking-card"
                    key={booking.id}
                    >


                    <h3>
                    {booking.property?.title}
                    </h3>


                    <p>
                    📍 {booking.property?.location}
                    </p>


                    <p>

                    Status:
                    <b>
                    {" "}
                    {booking.status}
                    </b>

                    </p>


                    <Link
                    to={`/properties/${booking.property?.id}`}
                    >

                    View Property

                    </Link>


                    </div>


                    ))

                    }


                </div>





                {/* FAVORITES */}


                <div className="dashboard-section">


                <h2>
                    ❤️ Favorite Homes
                </h2>



                {

                favorites.map((item)=>(


                <div
                className="favorite-card"
                key={item.id}
                >


                <img

                src={
                item.property?.image ||
                "/default-house.jpg"
                }

                alt="house"

                />



                <div>


                <h3>
                {item.property?.title}
                </h3>


                <p>
                📍 {item.property?.location}
                </p>


                <p>
                $
                {Number(item.property?.price)
                .toLocaleString()}
                </p>



                <button
                onClick={()=>
                removeFavorite(item.id)
                }
                >

                Remove

                </button>


                </div>


                </div>


                ))

                }


                </div>



            </div>


        </section>



        <Notifications/>

        <Footer/>


        </>

    );

}


export default Dashboard;