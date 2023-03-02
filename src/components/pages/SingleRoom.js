import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function RoomDetails(props) {
    const [room, setRoom] = useState({});

    const { _id } = useParams();
    const navigate = useNavigate();

    useEffect(
        function () {
            async function getRoomById() {
                try {
                    const response = await axios.get(`/api/rooms/${_id}`);
                    setRoom(response.data);
                } catch (error) {
                    console.log("error", error);
                }
            }
            
            getRoomById();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props]
    );

    async function handleDelete() {
        try {
            await axios.delete(`/api/rooms/${_id}`);
            navigate("/rooms/grid-view");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">

            <p>
                <b>Room No</b>: {room.roomNo}
            </p>

            <p>
                <b>Type</b>: {room.type}
            </p>

            <p>
                <b>Price Per Hour</b>: {room.pricePerHour}
            </p>
            <div className="btn-group ">
                <Link to={`/rooms/${room._id}/edit`} className="btn btn-primary">
                    Edit
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                    Delete
                </button>
                <Link to="/rooms/grid-view" className="btn btn-secondary">
                    Close
                </Link>
            </div>
            <hr />
        </div>
    );
}

export default RoomDetails;
