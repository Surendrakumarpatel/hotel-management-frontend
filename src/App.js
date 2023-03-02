import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import BookRoom from "./components/rooms/BookRoom";
import Bookings from "./components/rooms/Bookings";
import BookingEdit from "./components/rooms/BookingEdit";
import RoomGridView from "./components/rooms/RoomGridView";
import CrudDetails from "./components/rooms/BookingDetails";
import RoomEdit from "./components/rooms/RoomEdit";
import Footer from "./components/common/Footer";
import CreateRoom from "./components/pages/CreateRoom";
import RoomDetails from "./components/pages/SingleRoom";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/api/" element={<Home />} />
					<Route exact path="/bookings" element={<Bookings />} />					
					<Route exact path="/bookings/new" element={<BookRoom />} />
					<Route exact path="/bookings/:_id" element={<CrudDetails />} />
					<Route exact path="/bookings/:_id/edit" element={<BookingEdit />} />
					<Route exact path="/rooms/create" element={<CreateRoom />} />
					<Route exact path="/rooms/:_id" element={<RoomDetails />} />
					<Route exact path="/rooms/grid-view" element={<RoomGridView />} />
					<Route exact path="/rooms/:_id/edit" element={<RoomEdit />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
