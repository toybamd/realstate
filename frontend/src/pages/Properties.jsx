import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";

import Search from "../components/Search/Search";

import "./Properties.css";


function Properties(){


    const [properties,setProperties] = useState([]);

    const [loading,setLoading] = useState(true);



    const [search,setSearch] = useState("");
    const [type,setType] = useState("");
    const [minPrice,setMinPrice] = useState("");
    const [maxPrice,setMaxPrice] = useState("");
    const [bedrooms,setBedrooms] = useState("");




    const loadProperties = async()=>{


        try{


            setLoading(true);


            const response = await api.get(

                `properties/?search=${search}&type=${type}&min_price=${minPrice}&max_price=${maxPrice}&bedrooms=${bedrooms}`

            );


            setProperties(response.data);


            setLoading(false);


        }
        catch(error){


            console.log(error);

            setLoading(false);


        }


    };





    useEffect(()=>{


        loadProperties();


    },[]);





    return(

    <>

        <Navbar />


        <section className="properties-page">


            <h1>
                Available Properties
            </h1>



            <Search

                search={search}

                setSearch={setSearch}

                type={type}

                setType={setType}

                minPrice={minPrice}

                setMinPrice={setMinPrice}

                maxPrice={maxPrice}

                setMaxPrice={setMaxPrice}

                bedrooms={bedrooms}

                setBedrooms={setBedrooms}

                onSearch={loadProperties}

            />




            {
                loading ?

                (

                    <h2>
                        Loading...
                    </h2>

                )


                :


                properties.length === 0 ?

                (

                    <h2>
                        No properties found
                    </h2>

                )


                :


                (

                    <div className="property-grid">


                    {
                    properties.map((property)=>(


                        <Link

                            key={property.id}

                            to={`/properties/${property.id}`}

                            className="property-link"

                        >


                        <div className="property-card">


                            <img

                                src={property.image}

                                alt={property.title}

                            />


                            {
                                property.featured &&

                                <span className="featured">

                                    Featured

                                </span>

                            }



                            <div className="property-info">


                                <h2>

                                    ${Number(property.price).toLocaleString()}

                                </h2>


                                <h3>

                                    {property.title}

                                </h3>


                                <p>
                                    📍 {property.location}
                                </p>


                                <p>
                                    🛏 {property.bedrooms} Bedrooms
                                </p>


                                <p>
                                    🚿 {property.bathrooms} Bathrooms
                                </p>


                            </div>


                        </div>


                        </Link>


                    ))
                    }


                    </div>

                )

            }



        </section>


        <Footer />


    </>

);

}



export default Properties;