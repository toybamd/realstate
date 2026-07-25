import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";

import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

import "./AdminProperties.css";


function AdminProperties(){


    const token = localStorage.getItem("access");


    const [properties,setProperties] = useState([]);

    const [search,setSearch] = useState("");




    useEffect(()=>{

        loadProperties();

    },[]);






    const loadProperties = async()=>{


        try{


            const response = await api.get(

                "admin/properties/",

                {

                    headers:{
                        Authorization:`Bearer ${token}`
                    }

                }

            );


            setProperties(response.data);


        }


        catch(error){

            console.log(
                "Property loading error:",
                error
            );

        }


    };







    const deleteProperty = async(id)=>{


        const confirmDelete =
        window.confirm(
            "Delete this property?"
        );


        if(!confirmDelete){

            return;

        }



        try{


            await api.delete(


                `admin/properties/${id}/`,


                {

                    headers:{
                        Authorization:`Bearer ${token}`
                    }

                }


            );



            loadProperties();



        }


        catch(error){

            console.log(
                "Delete error:",
                error
            );


        }


    };







    const filtered = properties.filter(property=>


        property.title
        .toLowerCase()
        .includes(search.toLowerCase())


        ||


        property.location
        .toLowerCase()
        .includes(search.toLowerCase())


    );







    return(


        <>


        <AdminNavbar />



        <section className="admin-properties">



            <div className="admin-properties-container">



                <div className="admin-header">


                    <div>


                        <h1>

                            Property Management

                        </h1>


                        <p>

                            Manage all listed properties.

                        </p>


                    </div>





                    <Link

                    to="/admin/properties/add"

                    className="add-btn"

                    >

                        + Add Property

                    </Link>



                </div>








                <input


                className="search-box"


                type="text"


                placeholder="Search property..."


                value={search}


                onChange={(e)=>
                    setSearch(e.target.value)
                }


                />









                {

                filtered.length===0 ?


                (

                    <h2 className="empty">

                        No properties found

                    </h2>


                )


                :



                <div className="property-grid">



                {

                filtered.map(property=>(



                    <div

                    className="admin-property-card"

                    key={property.id}

                    >




                        <img

                        src={property.image}

                        alt={property.title}

                        />





                        <div className="property-content">





                            <h2>

                                {property.title}

                            </h2>





                            <p>

                                📍 {property.location}

                            </p>





                            <h3>

                                $

                                {Number(property.price)
                                .toLocaleString()}

                            </h3>






                            <span

                            className={

                            property.available

                            ?

                            "status available"

                            :

                            "status sold"

                            }

                            >


                            {

                            property.available

                            ?

                            "Available"

                            :

                            "Sold"

                            }


                            </span>







                            <div className="property-actions">



                                <Link

                                to={`/admin/properties/edit/${property.id}`}

                                >

                                    Edit

                                </Link>






                                <button

                                onClick={()=>
                                    deleteProperty(property.id)
                                }

                                >

                                    Delete

                                </button>




                            </div>





                        </div>





                    </div>


                ))


                }


                </div>


                }



            </div>



        </section>



        </>


    );


}


export default AdminProperties;