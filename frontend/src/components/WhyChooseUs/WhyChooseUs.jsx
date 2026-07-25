import "./WhyChooseUs.css";

import {
    FaCheckCircle,
    FaMoneyBillWave,
    FaUserTie,
    FaShieldAlt
} from "react-icons/fa";


const features = [

    {
        icon:<FaCheckCircle/>,
        title:"Verified Properties",
        text:"Every property is carefully verified to ensure quality, legal ownership, and accurate information."
    },

    {
        icon:<FaMoneyBillWave/>,
        title:"Flexible Down Payment",
        text:"Own your dream home with affordable down payment options and convenient installment plans."
    },

    {
        icon:<FaUserTie/>,
        title:"Professional Advisors",
        text:"Our experienced real estate consultants guide you through every step of buying your new home."
    },

    {
        icon:<FaShieldAlt/>,
        title:"Secure Transactions",
        text:"We provide transparent, secure, and legally protected property transactions for every client."
    }

];



function WhyChooseUs(){

return(

<section className="why">

<div className="why-header">

<h2>
Why Choose Gift RealState
</h2>

<p>
Experience a smarter way to buy modern homes with trusted professionals and flexible payment solutions.
</p>

</div>



<div className="feature-grid">

{

features.map((item,index)=>(

<div
className="feature-card"
key={index}
>

<div className="feature-icon">

{item.icon}

</div>

<h3>

{item.title}

</h3>

<p>

{item.text}

</p>

</div>

))

}

</div>

</section>

);

}

export default WhyChooseUs;