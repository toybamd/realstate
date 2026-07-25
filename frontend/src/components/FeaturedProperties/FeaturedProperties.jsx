import "./FeaturedProperties.css";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../../api/api";


function FeaturedProperties(){


    const [properties,setProperties] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        const loadFeatured = async()=>{


            try{


                const response = await api.get(
                    "properties/"
                );


                const featured = response.data.filter(
                    property => property.featured === true
                );


                setProperties(featured);



            }catch(error){


                console.log(
                    "Featured properties error:",
                    error
                );


            }finally{


                setLoading(false);


            }


        };


        loadFeatured();


    },[]);



    return(


        <section className="featured">


            <div className="featured-header">


                <h2>
                    Featured Properties
                </h2>


                <p>
                    Explore our latest modern homes.
                </p>


            </div>




            {
                loading ?


                <div className="loading">

                    Loading properties...

                </div>



                :



                properties.length === 0 ?


                <div className="loading">

                    No featured properties available.

                </div>



                :



                <div className="property-grid">


                    {
                        properties.map(property=>(


                            <Link

                                key={property.id}

                                to={`/properties/${property.id}`}

                                className="property-link"

                            >


                                <div className="property-card">



                                    <div className="image-container">


                                        <img

                                            src={property.image}

                                            alt={property.title}

                                        />



                                        <span>

                                            Featured

                                        </span>


                                    </div>





                                    <div className="property-info">


                                        <h3>

                                            $
                                            {Number(property.price).toLocaleString()}

                                        </h3>



                                        <h4>

                                            {property.title}

                                        </h4>



                                        <p>

                                            📍 {property.location}

                                        </p>




                                        <div className="details">


                                            <span>
                                                🛏 {property.bedrooms}
                                            </span>


                                            <span>
                                                🛁 {property.bathrooms}
                                            </span>


                                            <span>
                                                🚗 {property.garage}
                                            </span>


                                            <span>
                                                📐 {property.area} m²
                                            </span>



                                        </div>



                                    </div>


                                </div>


                            </Link>


                        ))
                    }



                </div>


            }



        </section>


    );


}


export default FeaturedProperties;