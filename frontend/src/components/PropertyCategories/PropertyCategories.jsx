import "./PropertyCategories.css";

import { Link } from "react-router-dom";

import villa from "../../assets/images/villa.jpg";
import apartment from "../../assets/images/apartment.jpg";
import family from "../../assets/images/family.jpg";
import luxury from "../../assets/images/luxury.jpg";
import smart from "../../assets/images/smart.png";


const categories = [

    {
        image: villa,
        title: "Luxury Villas",
        type: "Villa",
        description:
            "Elegant villas with spacious living areas and premium finishes."
    },

    {
        image: apartment,
        title: "Modern Apartments",
        type: "Apartment",
        description:
            "Stylish apartments designed for comfortable urban living."
    },

    {
        image: family,
        title: "Family Homes",
        type: "Family Home",
        description:
            "Safe and comfortable homes perfect for growing families."
    },

    {
        image: luxury,
        title: "Luxury Estates",
        type: "Luxury Home",
        description:
            "Exclusive residences offering exceptional elegance and prestige."
    },

    {
        image: smart,
        title: "Smart Homes",
        type: "Smart Home",
        description:
            "Modern homes equipped with advanced smart technologies."
    }

];


function PropertyCategories() {

    return (

        <section className="categories">

            <div className="category-header">

                <h2>
                    Explore Property Categories
                </h2>

                <p>
                    Discover homes designed for every lifestyle.
                </p>

            </div>

            <div className="category-grid">

                {categories.map((category, index) => (

                    <Link
                        key={index}
                        to={`/properties?type=${category.type}`}
                        className="category-link"
                    >

                        <div className="category-card">

                            <img
                                src={category.image}
                                alt={category.title}
                            />

                            <div className="category-content">

                                <h3>
                                    {category.title}
                                </h3>

                                <p>
                                    {category.description}
                                </p>

                            </div>

                        </div>

                    </Link>

                ))}

            </div>

        </section>

    );

}

export default PropertyCategories;