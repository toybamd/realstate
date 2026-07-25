
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "./About.css";

function About() {

    return (

        <>

            <Navbar />

            <section className="about-hero">

                <div className="container">

                    <h1>About Gift RealState</h1>

                    <p>

                        Helping families discover modern homes with trust,
                        transparency and exceptional service.

                    </p>

                </div>

            </section>


            <section className="about-section">

                <div className="container">

                    <div className="about-text">

                        <h2>Who We Are</h2>

                        <p>

                            Gift RealState is a modern real estate platform focused
                            on connecting buyers with beautiful homes,
                            apartments, and luxury villas. Our mission is to
                            make property searching simple, secure, and
                            enjoyable.

                        </p>

                        <p>

                            With experienced agents and a growing collection
                            of premium properties, we help thousands of people
                            find their dream homes every year.

                        </p>

                    </div>

                </div>

            </section>


            <section className="mission">

                <div className="container cards">

                    <div className="card">

                        <h3>🏠 Our Mission</h3>

                        <p>

                            To provide the easiest and most trusted way
                            to buy modern properties.

                        </p>

                    </div>

                    <div className="card">

                        <h3>🌍 Our Vision</h3>

                        <p>

                            To become the leading real estate platform
                            across Africa.

                        </p>

                    </div>

                    <div className="card">

                        <h3>⭐ Our Values</h3>

                        <p>

                            Trust, honesty, quality service,
                            and customer satisfaction.

                        </p>

                    </div>

                </div>

            </section>


            <section className="stats">

                <div className="container stats-grid">

                    <div>

                        <h2>1500+</h2>

                        <p>Properties</p>

                    </div>

                    <div>

                        <h2>800+</h2>

                        <p>Happy Clients</p>

                    </div>

                    <div>

                        <h2>35+</h2>

                        <p>Professional Agents</p>

                    </div>

                    <div>

                        <h2>10+</h2>

                        <p>Years Experience</p>

                    </div>

                </div>

            </section>


            <section className="cta">

                <div className="container">

                    <h2>Ready to Find Your Dream Home?</h2>

                    <p>

                        Explore hundreds of modern houses today.

                    </p>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default About;