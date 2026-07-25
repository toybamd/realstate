import { useEffect, useState } from "react";

import api from "../api/api";

import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

import "./AdminBookings.css";


function AdminBookings(){


    const token = localStorage.getItem("access");


    const [bookings,setBookings] = useState([]);

    const [loading,setLoading] = useState(true);






    useEffect(()=>{

        loadBookings();

    },[]);








    const loadBookings = async()=>{


        try{


            const response = await api.get(

                "admin/bookings/",

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );


            setBookings(response.data);


        }


        catch(error){

            console.log(error);

        }


        finally{

            setLoading(false);

        }


    };










    const updateStatus = async(id,status)=>{


        try{


            await api.patch(

                `admin/bookings/${id}/`,

                {

                    status:status

                },

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );


            loadBookings();


        }


        catch(error){

            console.log(error);

        }


    };









    const deleteBooking = async(id)=>{


        if(!window.confirm("Delete this booking?")){

            return;

        }




        try{


            await api.delete(

                `admin/bookings/${id}/`,

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );


            loadBookings();


        }


        catch(error){

            console.log(error);

        }


    };








    if(loading){


        return(

            <>

            <AdminNavbar />

            <h2 className="loading">

                Loading bookings...

            </h2>

            </>

        );

    }








    return(


        <>


        <AdminNavbar />



        <section className="admin-bookings">



            <div className="booking-container">


                <h1>

                    Booking Management

                </h1>





                <table>


                    <thead>


                        <tr>

                            <th>
                                Customer
                            </th>


                            <th>
                                Property
                            </th>


                            <th>
                                Date
                            </th>


                            <th>
                                Time
                            </th>


                            <th>
                                Status
                            </th>


                            <th>
                                Action
                            </th>


                        </tr>


                    </thead>






                    <tbody>



                    {

                    bookings.map((booking)=>(


                    <tr key={booking.id}>


                        <td>


                            <b>
                            {booking.full_name}
                            </b>


                            <br/>


                            {booking.email}


                        </td>





                        <td>

                            {booking.property?.title}

                        </td>





                        <td>

                            {booking.preferred_date}

                        </td>





                        <td>

                            {booking.preferred_time}

                        </td>





                        <td>


                            <span

                            className={
                                booking.status==="Approved"
                                ?
                                "approved"
                                :
                                booking.status==="Rejected"
                                ?
                                "rejected"
                                :
                                "pending"
                            }

                            >

                                {booking.status}


                            </span>


                        </td>







                        <td>


                            <button

                            className="approve"

                            onClick={()=>updateStatus(

                                booking.id,

                                "Approved"

                            )}

                            >

                                Approve

                            </button>






                            <button

                            className="reject"

                            onClick={()=>updateStatus(

                                booking.id,

                                "Rejected"

                            )}

                            >

                                Reject

                            </button>






                            <button

                            className="delete"

                            onClick={()=>deleteBooking(

                                booking.id

                            )}

                            >

                                Delete

                            </button>



                        </td>




                    </tr>



                    ))

                    }



                    </tbody>



                </table>




            </div>



        </section>



        </>


    );


}


export default AdminBookings;