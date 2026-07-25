import "./Search.css";


function Search({

    search,
    setSearch,

    type,
    setType,

    minPrice,
    setMinPrice,

    maxPrice,
    setMaxPrice,

    bedrooms,
    setBedrooms,

    onSearch

}) {


    return (

        <div className="search-box">


            <input

                type="text"

                placeholder="Search by title or location"

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />



            <select

                value={type}

                onChange={(e)=>setType(e.target.value)}

            >

                <option value="">
                    All Types
                </option>

                <option value="Villa">
                    Villa
                </option>

                <option value="Apartment">
                    Apartment
                </option>

                <option value="Family Home">
                    Family Home
                </option>

                <option value="Luxury Home">
                    Luxury Home
                </option>

                <option value="Smart Home">
                    Smart Home
                </option>


            </select>




            <input

                type="number"

                placeholder="Minimum Price"

                value={minPrice}

                onChange={(e)=>setMinPrice(e.target.value)}

            />



            <input

                type="number"

                placeholder="Maximum Price"

                value={maxPrice}

                onChange={(e)=>setMaxPrice(e.target.value)}

            />




            <input

                type="number"

                placeholder="Bedrooms"

                value={bedrooms}

                onChange={(e)=>setBedrooms(e.target.value)}

            />




            <button

                onClick={onSearch}

            >

                Search

            </button>



        </div>

    );

}


export default Search;