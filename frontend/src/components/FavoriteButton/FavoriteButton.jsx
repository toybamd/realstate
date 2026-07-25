import { useEffect, useState } from "react";
import api from "../../api/api";

function FavoriteButton({ propertyId }) {

    const token = localStorage.getItem("access");

    const [favorite, setFavorite] = useState(null);

    useEffect(() => {

        if (!token) return;

        api.get("favorites/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {

            const item = res.data.find(
                fav => fav.property === propertyId
            );

            setFavorite(item || null);

        })
        .catch(console.log);

    }, [propertyId]);

    const addFavorite = () => {

        api.post(
            "favorites/add/",
            {
                property: propertyId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((res) => {

            setFavorite(res.data);

        })
        .catch(console.log);

    };

    const removeFavorite = () => {

        api.delete(
            `favorites/${favorite.id}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(() => {

            setFavorite(null);

        })
        .catch(console.log);

    };

    if (!token) return null;

    return favorite ? (

        <button onClick={removeFavorite}>
            ❤️ Remove Favorite
        </button>

    ) : (

        <button onClick={addFavorite}>
            🤍 Add Favorite
        </button>

    );

}

export default FavoriteButton;