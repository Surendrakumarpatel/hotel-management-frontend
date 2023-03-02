import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RoomGridView() {
	const [rooms, setRooms] = useState([]);

	useEffect(function () {
		async function getRooms() {
			try {
				const response = await axios.get("/api/rooms");
				console.log(response.data);
				setRooms(response.data.rooms);
			} catch (error) {
				console.log("error", error);
			}
		}
		getRooms();
	}, []);

	return (
		<div className="container">
			<h2>
				Rooms
				<p>
					<Link to="/rooms/new" className="btn btn-primary float-right">
						Create Room
					</Link>
				</p>
			</h2>
			<hr />
			<div>
				<div className="d-flex flex-wrap">
					{rooms.map((room) => {
						return (
							<div
								className="card"
								style={{ width: 250, margin: 30 }}
								key={room._id}
							>
								<div className="card-header">
									<h5 className="card-title">
										<Link to={`/rooms/${room._id}`} className="link-line">
											Room No: {room.roomNo}
										</Link>
									</h5>
								</div>
								<div className="card-body">
									<h5 className="d-flex align-items-center">
										<a className="card-subtitle" href={`tel:+${room.phone}`}>
											Type: {room.type}
										</a>
									</h5>
									<p className="card-text limit-char">{room.description}</p>
									<p className="card-text d-flex align-items-center">
										Price per hour: ₹
										<small className="text-muted one-liner">
											{room.pricePerHour}
										</small>
									</p>
								</div>
								<div className="card-footer d-flex align-items-center">
									<Link
										to={`/rooms/${room._id}/edit`}
										className="btn btn-primary"
									>
										Edit
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default RoomGridView;
