import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedProperties from "../components/FeaturedProperties/FeaturedProperties";
import PropertyCategories from "../components/PropertyCategories/PropertyCategories";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Footer from "../components/Footer/Footer";

function Home(){

    return (

        <>

            <Navbar />

            <Hero />

            <FeaturedProperties />

            <PropertyCategories />

            <WhyChooseUs />

            <Footer />

        </>

    );

}

export default Home;