import { useEffect, useState } from "react";
import api from "../api/api";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

import "./AdminUsers.css";

function AdminUsers(){

    const token = localStorage.getItem("access");

    const [users,setUsers] = useState([]);

    const [search,setSearch] = useState("");

    useEffect(()=>{

        loadUsers();

    },[]);

    const loadUsers = async()=>{

        try{

            const response = await api.get(

                "admin/users/",

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );

            setUsers(response.data);

        }

        catch(error){

            console.log(error);

        }

    };

    const deleteUser = async(id)=>{

        if(!window.confirm("Delete this user?")){

            return;

        }

        try{

            await api.delete(

                `admin/users/${id}/`,

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );

            loadUsers();

        }

        catch(error){

            console.log(error);

        }

    };

    const filtered = users.filter(user=>

        user.username
        .toLowerCase()
        .includes(search.toLowerCase())

        ||

        user.email
        .toLowerCase()
        .includes(search.toLowerCase())

    );

    return(

        <>

        <AdminNavbar/>

        <section className="admin-users">

            <div className="admin-users-container">

                <h1>User Management</h1>

                <input

                    className="search-box"

                    placeholder="Search users..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

                <table>

                    <thead>

                        <tr>

                            <th>Username</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Date Joined</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                    {

                    filtered.map(user=>(

                    <tr key={user.id}>

                        <td>

                            {user.username}

                        </td>

                        <td>

                            {user.email}

                        </td>

                        <td>

                            {

                            user.is_staff

                            ?

                            <span className="role admin">

                                Admin

                            </span>

                            :

                            <span className="role customer">

                                Customer

                            </span>

                            }

                        </td>

                        <td>

                            {new Date(user.date_joined).toLocaleDateString()}

                        </td>

                        <td>

                            {

                            !user.is_superuser &&

                            <button

                            className="delete-btn"

                            onClick={()=>deleteUser(user.id)}

                            >

                                Delete

                            </button>

                            }

                        </td>

                    </tr>

                    ))

                    }

                    </tbody>

                </table>

            </div>

        </section>

        </>

    );

}

export default AdminUsers;