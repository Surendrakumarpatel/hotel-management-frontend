import React, { useState } from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";

function CreateRoom(props) {
	const initialState = {
		roomNo: "",
		type: "A",
	};
	const [room, setRoom] = useState(initialState);

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		async function postCrud() {
			try {
				const response = await post("/api/rooms/", room);
				navigate(`/rooms/${response.data._id}`);
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
		navigate("/rooms/grid-view");
	}

	return (
		<div className="container" style={{ maxWidth: "400px" }}>
			<h1>Create Room</h1>
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

                <div className="form-group py-4">
					<label>Type</label>
					<select 
                        name = "type"
                        onChange={handleChange}
                        value={room.type}
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
				</div>


				<div className="btn-group">
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

export default CreateRoom;
