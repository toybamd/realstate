import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

import "./AddProperty.css";


function AddProperty(){


    const navigate = useNavigate();

    const token = localStorage.getItem("access");



    const [form,setForm] = useState({

        title:"",
        description:"",
        price:"",
        location:"",
        property_type:"Villa",
        bedrooms:1,
        bathrooms:1,
        garage:0,
        area:"",
        year_built:"",
        featured:false,
        available:true,
        image:null,
        gallery:[]

    });



    const [preview,setPreview]=useState(null);






    const handleChange=(e)=>{


        const {

            name,
            value,
            type,
            checked,
            files

        }=e.target;



        if(type==="file"){


            setForm({

                ...form,

                [name]:files[0]

            });



            if(files[0]){

                setPreview(

                    URL.createObjectURL(files[0])

                );

            }


        }


        else{


            setForm({

                ...form,

                [name]:

                type==="checkbox"

                ?

                checked

                :

                value

            });


        }


    };








    const handleGalleryChange=(e)=>{


        setForm({

            ...form,

            gallery:e.target.files

        });


    };









    const handleSubmit=async(e)=>{


        e.preventDefault();



        const data=new FormData();



        Object.keys(form).forEach(key=>{


            if(key!=="gallery"){


                data.append(

                    key,

                    form[key]

                );


            }


        });





        for(

            let i=0;

            i<form.gallery.length;

            i++

        ){


            data.append(

                "gallery",

                form.gallery[i]

            );


        }







        try{


            await api.post(

                "admin/properties/",

                data,

                {

                    headers:{


                        Authorization:

                        `Bearer ${token}`,


                        "Content-Type":

                        "multipart/form-data"

                    }

                }

            );




            alert(

                "Property added successfully"

            );



            navigate(

                "/admin/properties"

            );



        }


        catch(error){


            console.log(error.response);


            alert(

                "Failed to add property"

            );


        }


    };








    return(


        <>


        <AdminNavbar />



        <section className="add-property-page">



        <div className="add-property-container">





        <div className="add-header">


            <h1>
                🏠 Add New Property
            </h1>


            <p>
                Create a new property listing.
            </p>


        </div>







        <form

        className="add-form"

        onSubmit={handleSubmit}

        >





        {

        preview &&

        <div className="image-preview">

            <img

            src={preview}

            alt="preview"

            />

        </div>

        }









        <div className="form-grid">





        <div className="form-group">

        <label>
            Title
        </label>


        <input

        name="title"

        onChange={handleChange}

        required

        />


        </div>







        <div className="form-group">

        <label>
            Location
        </label>


        <input

        name="location"

        onChange={handleChange}

        required

        />


        </div>









        <div className="form-group">

        <label>
            Price
        </label>


        <input

        name="price"

        type="number"

        onChange={handleChange}

        required

        />


        </div>









        <div className="form-group">


        <label>
            Property Type
        </label>


        <select

        name="property_type"

        onChange={handleChange}

        >


        <option>
        Villa
        </option>


        <option>
        Apartment
        </option>


        <option>
        Family Home
        </option>


        <option>
        Luxury Home
        </option>


        <option>
        Smart Home
        </option>


        </select>


        </div>








        <div className="form-group">

        <label>
            Bedrooms
        </label>


        <input

        name="bedrooms"

        type="number"

        onChange={handleChange}

        />


        </div>








        <div className="form-group">

        <label>
            Bathrooms
        </label>


        <input

        name="bathrooms"

        type="number"

        onChange={handleChange}

        />


        </div>








        <div className="form-group">

        <label>
            Area m²
        </label>


        <input

        name="area"

        type="number"

        onChange={handleChange}

        />


        </div>






        <div className="form-group">

        <label>
            Year Built
        </label>


        <input

        name="year_built"

        type="number"

        onChange={handleChange}

        />


        </div>






        </div>









        <div className="form-group full">


        <label>
            Description
        </label>


        <textarea

        name="description"

        onChange={handleChange}

        />



        </div>









        <div className="upload-box">


        <label>
            Main Image
        </label>


        <input

        type="file"

        name="image"

        accept="image/*"

        onChange={handleChange}

        />





        <label>
            Gallery Images
        </label>


        <input

        type="file"

        multiple

        accept="image/*"

        onChange={handleGalleryChange}

        />



        </div>








        <div className="checkbox-area">


        <label>


        <input

        type="checkbox"

        name="featured"

        onChange={handleChange}

        />

        Featured


        </label>






        <label>


        <input

        type="checkbox"

        name="available"

        defaultChecked

        onChange={handleChange}

        />


        Available


        </label>


        </div>








        <button

        className="save-btn"

        >

        Save Property

        </button>






        </form>





        </div>



        </section>


        </>


    );

}


export default AddProperty;