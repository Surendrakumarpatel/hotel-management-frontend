import React, { useState } from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function BookRoom(props) {
	const initialState = {
		roomNo: "",
		email: "",
		startTime: "",
		endTime: "",
		tips: 0,
		paymentType: "cash"
	};
	const [room, setRoom] = useState(initialState);

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		async function postCrud() {
			try {
				const response = await post("/api/bookings/check", room);
				if (response.data.message) {
					toast(response.data.message);
					return;
				}
				if (response.data.roomAvailable) {
					toast("Room Booked");
				}
				else {
					toast("Room Not Available");
				}
			} catch (error) {
				console.log("error", error);
			}
		}
		postCrud();
	}

	function handleChange(event) {
		setRoom({ ...room, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate("/bookings");
	}

	return (
		<div className="container" style={{ maxWidth: "400px" }}>
			<h1>Book Room</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group my-2">
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
				<div className="form-group my-2">
					<label>Email</label>
					<input
						name="email"
						type="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
						required
						value={room.email}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group my-2">
					<label>Start Time</label>
					<input
						name="startTime"
						type="datetime-local"
						required
						value={room.startTime}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="form-group my-2">
					<label>End Time</label>
					<input
						name="endTime"
						type="datetime-local"
						required
						value={room.endTime}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="form-group my-2">
					<label>Tips Percent</label>
					<input
						name="tips"
						type="number"
						required
						value={room.tips}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="form-group my-2">
					<span> Payment Type:  </span>
					<select
						name="paymentType"
						onChange={handleChange}
						value={room.paymentType}
					>
						<option value="cash">Cash</option>
						<option value="card">Card</option>
						<option value="upi">UPI</option>
					</select>
				</div>


				<div className="btn-group my-4">
					<input type="submit" value="Submit" className="btn btn-primary" />
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

export default BookRoom;
