import UserNavbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/api";

import "./Booking.css";


function Booking(){


    const navigate = useNavigate();


    const { id } = useParams();



    const [form,setForm] = useState({

        property:id,

        full_name:"",

        email:"",

        phone:"",

        preferred_date:"",

        preferred_time:"",

        message:""

    });





    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };





    const submitBooking = async(e)=>{


        e.preventDefault();



        try{


            await api.post(

                "bookings/",

                form

            );



            alert(
                "Booking submitted successfully"
            );



            navigate("/dashboard");


        }


        catch(error){


            console.log(error);


            alert(
                "Booking failed"
            );


        }


    };






    return(

    <>

    <UserNavbar />


    <div className="booking-page">



            <h1>
                Book Property Visit
            </h1>



            <form
                onSubmit={submitBooking}
            >



                <input

                    name="full_name"

                    placeholder="Full Name"

                    value={form.full_name}

                    onChange={handleChange}

                    required

                />





                <input

                    name="email"

                    type="email"

                    placeholder="Email"

                    value={form.email}

                    onChange={handleChange}

                    required

                />





                <input

                    name="phone"

                    placeholder="Phone Number"

                    value={form.phone}

                    onChange={handleChange}

                    required

                />





                <input

                    name="preferred_date"

                    type="date"

                    value={form.preferred_date}

                    onChange={handleChange}

                    required

                />





                <input

                    name="preferred_time"

                    type="time"

                    value={form.preferred_time}

                    onChange={handleChange}

                    required

                />





                <textarea

                    name="message"

                    placeholder="Message"

                    value={form.message}

                    onChange={handleChange}

                />





                <button>

                    Submit Booking

                </button>




            </form>



            </div>


    <Footer />

    </>

);


}



export default Booking;