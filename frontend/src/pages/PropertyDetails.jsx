import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import api from "../api/api";

import "./PropertyDetails.css";


function PropertyDetails(){


    const { id } = useParams();

    const navigate = useNavigate();


    const { user } = useContext(AuthContext);



    const [property,setProperty] = useState(null);

    const [loading,setLoading] = useState(true);


    const [favorite,setFavorite] = useState(false);



    const token = localStorage.getItem("access");




    useEffect(()=>{


        loadProperty();


        if(user){

            checkFavorite();

        }


    },[id,user]);





    const loadProperty = async()=>{


        try{


            const response = await api.get(
                `properties/${id}/`
            );


            setProperty(response.data);


        }


        catch(error){

            console.log(error);

        }


        finally{

            setLoading(false);

        }


    };





    const checkFavorite = async()=>{


        try{


            const response = await api.get(

                "favorites/",

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );



            const exists = response.data.some(

                (item)=>

                item.property.id === Number(id)

            );



            setFavorite(exists);


        }


        catch(error){

            console.log(error);

        }


    };






    const toggleFavorite = async()=>{


        if (!user) {

         const goRegister = window.confirm(
        "You need an account to save favorite properties.\n\nPress OK to Register."
        );

        if (goRegister) {

          navigate("/register");

        }

         return;

        }




        try{


            if(favorite){


                const response = await api.get(

                    "favorites/",

                    {

                        headers:{

                            Authorization:`Bearer ${token}`

                        }

                    }

                );



                const item = response.data.find(

                    fav => fav.property.id === Number(id)

                );



                await api.delete(

                    `favorites/${item.id}/`,

                    {

                        headers:{

                            Authorization:`Bearer ${token}`

                        }

                    }

                );



                setFavorite(false);



                alert(
                    "Removed from favorites"
                );



            }


            else{


                await api.post(

                    "favorites/add/",

                    {
                        property:id
                    },

                    {

                        headers:{

                            Authorization:`Bearer ${token}`

                        }

                    }

                );



                setFavorite(true);



                alert(
                    "Added to favorites ❤️"
                );


            }


        }


        catch(error){


            console.log(error);


            alert(
                "Favorite action failed"
            );


        }


    };

    const handleBookVisit = () => {

     if (!user) {

        const goRegister = window.confirm(
            "You need an account to book a property.\n\nPress OK to Register."
     );

     if (goRegister) {

            navigate("/register");

     }

     return;

     }

    navigate(`/booking/${id}`);

    };

    if(loading){

     
        return(

            <h2
                style={{
                    textAlign:"center",
                    marginTop:"50px"
                }}
            >

                Loading...

            </h2>

        );

    }





    if(!property){


        return(

            <h2>

                Property not found

            </h2>

        );

    }






    return(

    <>

        <Navbar />


        <section className="property-details">


            <div className="details-image">


                <img

                    src={property.image}

                    alt={property.title}

                />


            </div>



            <div className="details-info">


                <h1>
                    {property.title}
                </h1>



                <h2>
                    ${Number(property.price).toLocaleString()}
                </h2>



                <p>
                    📍 {property.location}
                </p>



                <p>
                    🏠 Type:
                    {" "}
                    {property.property_type}
                </p>



                <div className="features">

                    <span>
                        🛏 {property.bedrooms} Bedrooms
                    </span>


                    <span>
                        🚿 {property.bathrooms} Bathrooms
                    </span>


                    <span>
                        🚗 {property.garage} Garage
                    </span>


                    <span>
                        📐 {property.area} m²
                    </span>


                </div>




                <h3>
                    Description
                </h3>


                <p>
                    {property.description}
                </p>




                <div className="actions">


                    <button
                        onClick={toggleFavorite}
                    >

                        {
                            favorite
                            ?
                            "💔 Remove Favorite"
                            :
                            "❤️ Add Favorite"
                        }

                    </button>




                    <button
                        onClick={handleBookVisit}
                    >

                        📅 Book Visit

                    </button>



                </div>



            </div>


        </section>



        <Footer />

    </>

);

}



export default PropertyDetails;