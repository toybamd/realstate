import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";

import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

import "./EditProperty.css";


function EditProperty(){


    const { id } = useParams();

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



    const [preview,setPreview] = useState(null);





    useEffect(()=>{


        api.get(

            `properties/${id}/`

        )

        .then(response=>{


            const data=response.data;



            setForm({

                title:data.title,

                description:data.description,

                price:data.price,

                location:data.location,

                property_type:data.property_type,

                bedrooms:data.bedrooms,

                bathrooms:data.bathrooms,

                garage:data.garage,

                area:data.area,

                year_built:data.year_built,

                featured:data.featured,

                available:data.available,

                image:null,

                gallery:[]

            });


            setPreview(data.image);



        })


        .catch(error=>{

            console.log(error);

        });



    },[id]);








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


                if(form[key]!==null){


                    data.append(

                        key,

                        form[key]

                    );


                }


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


            await api.put(

                `admin/properties/${id}/`,

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

                "Property updated successfully"

            );



            navigate(

                "/admin/properties"

            );



        }



        catch(error){


            console.log(error);


            alert(

                "Update failed"

            );


        }


    };









    return(


        <>


        <AdminNavbar />



        <section className="edit-property-page">



        <div className="edit-property-container">





        <div className="edit-header">


            <h1>

                ✏ Edit Property

            </h1>


            <p>

                Update your property information.

            </p>


        </div>







        <form

        onSubmit={handleSubmit}

        className="edit-form"

        >







        <div className="image-preview">


            {

            preview &&

            <img

            src={preview}

            alt="preview"

            />

            }


        </div>








        <div className="form-grid">





        <div className="form-group">


        <label>
            Property Title
        </label>


        <input

        name="title"

        value={form.title}

        onChange={handleChange}

        />


        </div>









        <div className="form-group">


        <label>
            Location
        </label>


        <input

        name="location"

        value={form.location}

        onChange={handleChange}

        />


        </div>










        <div className="form-group">


        <label>
            Price
        </label>


        <input

        type="number"

        name="price"

        value={form.price}

        onChange={handleChange}

        />


        </div>









        <div className="form-group">


        <label>
            Type
        </label>


        <select

        name="property_type"

        value={form.property_type}

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

        type="number"

        name="bedrooms"

        value={form.bedrooms}

        onChange={handleChange}

        />


        </div>









        <div className="form-group">


        <label>
            Bathrooms
        </label>


        <input

        type="number"

        name="bathrooms"

        value={form.bathrooms}

        onChange={handleChange}

        />


        </div>






        <div className="form-group">


        <label>
            Area m²
        </label>


        <input

        type="number"

        name="area"

        value={form.area}

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

        value={form.description}

        onChange={handleChange}

        />



        </div>









        <div className="upload-box">


        <label>
            Change Main Image
        </label>


        <input

        type="file"

        name="image"

        accept="image/*"

        onChange={handleChange}

        />






        <label>
            Add Gallery Images
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

        checked={form.featured}

        onChange={handleChange}

        />


        Featured


        </label>







        <label>


        <input

        type="checkbox"

        name="available"

        checked={form.available}

        onChange={handleChange}

        />


        Available


        </label>



        </div>









        <button

        className="update-btn"

        >

            Save Changes

        </button>






        </form>





        </div>



        </section>




        </>


    );


}



export default EditProperty;