import React, { useState, useEffect } from "react";
import { get, put } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";

function BookingEdit(props) {
	const initialState = {
		roomNo: "",
		email: "",
		checkInDate: "",
		checkInDate: "",
		type: ""
	};
	const [booking, setBooking] = useState(initialState);

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updateRoom() {
				try {
					const response = await get(`/api/bookings/${_id}`);
					const checkInDate = new Date(response.data.booking.checkInDate);
					const checkOutDate = new Date(response.data.booking.checkOutDate);
					setBooking({
						...response.data.booking,
						checkInDate: `${checkInDate.toISOString().slice(0,10)}T${checkInDate.getHours()}:${checkInDate.getMinutes()}`,
						checkOutDate: `${checkOutDate.toISOString().slice(0,10)}T${checkOutDate.getHours()}:${checkOutDate.getMinutes()}`,
					});
					
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
				const response = await put(`/api/bookings/${booking._id}`, booking);
				if(response.data){
					toast(response.data.message);
				}
			} catch (error) {
				console.log(error);
			}
		}
		updateCrud();
	}

	function handleChange(event) {
		setBooking({ ...booking, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate(`/bookings/${booking._id}`);
	}

	return (
		<div className="container">
			<h1>Edit Booking (id: {booking._id})</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Room No</label>
					<input
						name="roomNo"
						type="text"
						required
						value={booking.roomNo}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="form-group py-4">
					<label>Type</label>
					<select
						name="type"
						onChange={handleChange}
						value={booking.type}
						defaultValue={booking.type}
					>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</select>
				</div>

				<div className="form-group">
					<label>Email</label>
					<input
						name="email"
						type="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
						required
						value={booking.email}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Start Time</label>
					<input
						name="checkInDate"
						type="datetime-local"
						required
						value={booking.checkInDate}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>End Time</label>
					<input
						name="checkOutDate"
						type="datetime-local"
						required
						value={booking.checkOutDate}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="btn-group py-4">
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

export default BookingEdit;
