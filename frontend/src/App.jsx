import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
// Public Pages
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import AdminUsers from "./pages/AdminUsers";
import Contact from "./pages/Contact";


// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";


// User
import Dashboard from "./pages/Dashboard";


// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import AdminBookings from "./pages/AdminBookings";



function App(){

    return (

        <Routes>


            {/* Home */}

            <Route
                path="/"
                element={<Home />}
            />


            {/* Properties */}

            <Route
                path="/properties"
                element={<Properties />}
            />
            <Route 
                path="/profile" 
                element={<Profile />}
            />
            <Route

              path="/profile/edit"

                  element={<EditProfile />}

            />

            <Route
                path="/properties/:id"
                element={<PropertyDetails />}
            />
            <Route

                path="/admin/users"

                element={<AdminUsers/>}

             />
            <Route

                path="/booking/:id"

                 element={<Booking />}

            />



            {/* Information */}

            <Route
                path="/about"
                element={<About />}
            />


            <Route
                path="/contact"
                element={<Contact />}
            />



            {/* Authentication */}

            <Route
                path="/login"
                element={<Login />}
            />


            <Route
                path="/register"
                element={<Register />}
            />



            {/* User Dashboard */}

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />



            {/* Admin */}

            <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
            />


            <Route
                path="/admin/properties"
                element={<AdminProperties />}
            />


            <Route
                path="/admin/properties/add"
                element={<AddProperty />}
            />


            <Route
                path="/admin/properties/edit/:id"
                element={<EditProperty />}
            />


            <Route
                path="/admin/bookings"
                element={<AdminBookings />}
            />


        </Routes>

    );

}


export default App;