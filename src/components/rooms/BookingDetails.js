import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function CrudDetails(props) {
	const [crud, setCrud] = useState({});

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function getCrudById() {
				try {
					const response = await axios.get(`/api/bookings/${_id}`);
					console.log(response.data.booking)
					setCrud(response.data.booking);
				} catch (error) {
					console.log("error", error);
				}
			}
			getCrudById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			console.log("Cancel Booking")
			axios.get(`/api/bookings/cancel/${_id}`);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="container">

			<p>
				<b>User Email</b>: {crud.email}
			</p>
			<p>
				<b>Room No</b>: {crud?.room?.roomNo}
			</p>
			<p>
				<b>Room Type</b>: {crud?.room?.type}
			</p>
			<p>
				<b>Price per hour</b>: ₹ {crud?.room?.pricePerHour}
			</p>
			<p>
				<b>Booked At</b>: {crud.bookedAt}
			</p>

			<p>
				<b>Check In Date</b>: {new Date(crud.checkInDate).toString()}
			</p>

			<p>
				<b>Check Out Date</b>: {new Date(crud.checkOutDate).toString()}
			</p>

			<p>
				<b>Status</b>: {crud.status}
			</p>

			<p>
				<b>Amount Paid</b>: {crud.amountPaid}
			</p>

			<p>
				<b>Payment Type</b>: {crud.paymentType}
			</p>

			<div className="btn-group ">
				<Link to={`/bookings/${crud._id}/edit`} className="btn btn-primary">
					Edit
				</Link>
				<button onClick={handleDelete} className="btn btn-danger">
					Cancel
				</button>
				<Link to="/bookings" className="btn btn-secondary">
					Close
				</Link>
			</div>
			<hr />
		</div>
	);
}

export default CrudDetails;
