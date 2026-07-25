import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "./Contact.css";

function Contact() {

    return (

        <>

            <Navbar />

            <section className="contact-hero">

                <div className="container">

                    <h1>Contact Us</h1>

                    <p>

                        We'd love to help you find your dream home.

                    </p>

                </div>

            </section>

            <section className="contact-section">

                <div className="contact-container">

                    <div className="contact-form">

                        <h2>Send us a Message</h2>

                        <form>

                            <input
                                type="text"
                                placeholder="Full Name"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                            />

                            <textarea
                                rows="6"
                                placeholder="Your Message"
                            />

                            <button>

                                Send Message

                            </button>

                        </form>

                    </div>

                    <div className="contact-info">

                        <h2>Office Information</h2>

                        <p>

                            📍 Addis Ababa, Ethiopia

                        </p>

                        <p>

                            📞 +251 900 000 000

                        </p>

                        <p>

                            ✉ info@Giftrealstate.com

                        </p>

                        <p>

                            🌐 www.Giftrealstate.com

                        </p>

                        <hr />

                        <h3>Business Hours</h3>

                        <p>Monday - Friday</p>

                        <p>8:00 AM - 6:00 PM</p>

                        <p>Saturday</p>

                        <p>9:00 AM - 3:00 PM</p>

                    </div>

                </div>

            </section>

           
            <Footer />

        </>

    );

}

export default Contact;