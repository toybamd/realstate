import "./Hero.css";

import heroImage from "../../assets/images/luxury-house.jpg";

import { useNavigate } from "react-router-dom";


function Hero(){

    const navigate = useNavigate();


    return(

        <section
            className="hero"
            style={{
                backgroundImage:`url(${heroImage})`
            }}
        >

            <div className="hero-overlay"></div>


            <div className="hero-content">


                <h1>

                    Find Your Dream
                    <br/>
                    Modern Home

                </h1>



                <p>

                    Discover luxury houses, apartments and villas
                    designed for modern living.

                </p>



                <div className="hero-buttons">


                    <button

                        className="primary-btn"

                        onClick={()=>navigate("/properties")}

                    >

                        Browse Homes

                    </button>



                    <button

                        className="secondary-btn"

                        onClick={()=>navigate("/properties")}

                    >

                        Book Viewing

                    </button>



                </div>



            </div>


        </section>


    );

}


export default Hero;