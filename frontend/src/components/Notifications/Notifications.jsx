import "./Notifications.css";

import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import api from "../../api/api";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const [open, setOpen] = useState(false);

    const loadNotifications = async () => {

        try {

            const token = localStorage.getItem("access");

            if (!token) return;

            const response = await api.get(
                "notifications/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotifications(response.data);

        }

        catch (error) {

            console.log("Notification loading error:", error);

        }

    };

    useEffect(() => {

        loadNotifications();

        const timer = setInterval(() => {

            loadNotifications();

        }, 30000);

        return () => clearInterval(timer);

    }, []);

    const markRead = async (id) => {

        try {

            const token = localStorage.getItem("access");

            await api.patch(
                `notifications/${id}/read/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadNotifications();

        }

        catch (error) {

            console.log(error);

        }

    };

    const unread = notifications.filter(
        notification => !notification.is_read
    ).length;

    return (

        <div className="notification-container">

            <button
                className="notification-icon"
                onClick={() => setOpen(!open)}
            >

                <FaBell />

                {

                    unread > 0 &&

                    <span className="badge">

                        {unread}

                    </span>

                }

            </button>

            {

                open &&

                <div className="notification-dropdown">

                    <h3>

                        Notifications

                    </h3>

                    {

                        notifications.length === 0 ?

                            (

                                <p>

                                    No notifications

                                </p>

                            )

                            :

                            notifications.map((notification) => (

                                <div

                                    key={notification.id}

                                    className={
                                        notification.is_read
                                            ? "notification read"
                                            : "notification"
                                    }

                                    onClick={() => markRead(notification.id)}

                                >

                                    <h4>

                                        {notification.title}

                                    </h4>

                                    <p>

                                        {notification.message}

                                    </p>

                                    <small>

                                        {

                                            new Date(
                                                notification.created_at
                                            ).toLocaleString()

                                        }

                                    </small>

                                </div>

                            ))

                    }

                </div>

            }

        </div>

    );

}

export default Notifications;