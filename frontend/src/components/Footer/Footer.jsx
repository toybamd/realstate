import "./Footer.css";

import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-column">

                    <h2>Gift RealState</h2>

                    <p>

                        Helping families find modern homes with trust,
                        quality, and professional service.

                    </p>

                </div>

                <div className="footer-column">

                    <h3>Quick Links</h3>

                    <ul>

                        <li>

                            <Link to="/">Home</Link>

                        </li>

                        <li>

                            <Link to="/properties">Properties</Link>

                        </li>
                        <li>

                            <Link to="/login">login</Link>

                        </li>
                        <li>

                            <Link to="/register">register</Link>

                        </li>
                        <li>

                            <Link to="/about">About</Link>

                        </li>

                        <li>

                            <Link to="/contact">Contact</Link>

                        </li>

                    </ul>

                </div>

                <div className="footer-column">

                    <h3>Contact</h3>

                    <p>📍 Addis Ababa, Ethiopia</p>

                    <p>📞 +251 900 000 000</p>

                    <p>✉ info@Gift realstate.com</p>

                </div>

                <div className="footer-column">

                    <h3>Working Hours</h3>

                    <p>Monday - Friday</p>

                    <p>8:00 AM - 6:00 PM</p>

                    <p>Saturday: 9:00 AM - 3:00 PM</p>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 Gift RealState. All Rights Reserved.

            </div>

        </footer>

    );

}

export default Footer;