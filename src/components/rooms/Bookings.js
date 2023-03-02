import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

let data;

function Bookings() {
	const [bookings, setBookings] = useState([]);
	const [roomType, setRoomType] = useState("");
	const [roomNo, setRoomNo] = useState(0);
	const [checkInTime, setCheckInTime] = useState(null);
	const [checkOutTime, setCheckOutTime] = useState(null);

	const CancelBooking = (id) => {
		console.log("Cancel Booking " + id)
		axios.get(`/api/bookings/cancel/${id}`);
	}

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get("/api/bookings");
				data = response.data.bookings;
				setBookings(response.data.bookings);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);

	useEffect(() => {
		if (!data) return;
		const newBookings = data.filter((val) => {
			if (roomType === "") {
				return true;
			}

			return val.room.type === roomType;
		});
		setBookings(newBookings);

	}, [roomType]);

	useEffect(() => {
		if (!data) return;
		const newBookings = data.filter((val) => {
			if (roomNo == 0) {
				return true;
			}

			return val.room.roomNo == roomNo;
		});
		setBookings(newBookings);

	}, [roomNo]);

	useEffect(() => {
		if (!data) return;
		const newBookings = data.filter((val) => {
			if (!checkInTime) {
				return true;
			}
			return new Date(val.checkInDate).getTime() >= new Date(checkInTime).getTime();
		});
		setBookings(newBookings);

	}, [checkInTime]);

	useEffect(() => {
		if (!data) return;
		const newBookings = data.filter((val) => {
			if (!checkOutTime) {
				return true;
			}
			return new Date(val.checkOutDate).getTime() <= new Date(checkOutTime).getTime();
		});
		setBookings(newBookings);

	}, [checkOutTime]);

	return (
		<div className="container">
			<div>
				<h2>
					Bookings
					<p>
						<Link to="/bookings/new" className="btn btn-primary float-right">
							Book New Room
						</Link>
					</p>
				</h2>
				<div className="filters d-flex justify-content-around flex-wrap">
					Filter By:<br />
					<div>
						Room Type:
						<select
							name="type"
							onChange={(e) => setRoomType(e.target.value)}
							value={roomType}
						>
							<option value=""></option>
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="C">C</option>
						</select>
					</div>
					<div>
						Room No: <input type="number" onChange={(e) => setRoomNo(e.target.value)} />
					</div>

					<div>
						Check In Time: <input type="datetime-local" onChange={(e) => setCheckInTime(e.target.value)} />
					</div>

					<div>
						Check out Time: <input type="datetime-local" onChange={(e) => setCheckOutTime(e.target.value)} />
					</div>
					

				</div>
				<hr />
			</div>

			<div className="table-responsive">
				<table className="table riped  table-hover table-bordered container">
					<thead>
						<tr>
							<th>Room No</th>
							<th>Room Type</th>
							<th>Email</th>
							<th>Check in date</th>
							<th>Check out date</th>
							<th>Status</th>
							<th>Amount</th>
							<th>Payment Type</th>
							<th>Refund</th>
							<th>View</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{bookings &&
							bookings.map((booking) => {
								return (
									<tr key={booking._id}>
										<td>
											<Link to={`/bookings/${booking._id}`} className="link-line">
												{booking.roomNo}
											</Link>
										</td>
										<td>{booking.room.type}</td>
										<td>{booking.email}</td>
										{/* <td>{new Date(booking.bookedAt).toString().slice(0,24)}</td> */}
										<td>{new Date(booking.checkInDate).toString().slice(0,24)}</td>
										<td>{new Date(booking.checkOutDate).toString().slice(0,24)}</td>
										<td>{booking.status}</td>
										<td>{booking.amountPaid}</td>
										<td>{booking.paymentType}</td>
										<td>{booking.refund}</td>
										<td>
											<Link to={`/bookings/${booking._id}`} className="btn btn-warning">
												View
											</Link>
										</td>
										<td>
											<Link
												to={`/bookings/${booking._id}/edit`}
												className="btn btn-success"
											>
												Edit
											</Link>
										</td>
										<td>
											<button
												className="btn btn-danger"
												onClick={() => CancelBooking(booking._id)}
											>
												Cancel
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Bookings;
