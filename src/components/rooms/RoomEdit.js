import React, { useState, useEffect } from "react";
import { get, put } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";

function RoomEdit(props) {
	const initialState = {
		roomNo: "",
		type: "A",
		pricePerHour: 0
	};
	const [room, setRoom] = useState(initialState);

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updateRoom() {
				try {
					const response = await get(`/api/rooms/${_id}`);
					setRoom(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			updateRoom();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updateCrud() {
			try {
				const response = await put(`/api/rooms/${room._id}`, room);
				if(response.data){
					toast("Updated room details")
				}
			} catch (error) {
				console.log(error);
			}
		}
		updateCrud();
	}

	function handleChange(event) {
		setRoom({ ...room, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate(`/bookings/${room._id}`);
	}

	return (
		<div className="container">
			<h1 className="my-4">Edit Room No {room.roomNo}</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Room No</label>
					<input
						name="roomNo"
						type="text"
						required
						value={room.roomNo}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="form-group my-4">
					<label>Type</label>
					<select
						name="type"
						onChange={handleChange}
						value={room.type}
					>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</select>
				</div>



				<div className="btn-group">
					<button type="submit" className="btn btn-primary">
						Update
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default RoomEdit;
