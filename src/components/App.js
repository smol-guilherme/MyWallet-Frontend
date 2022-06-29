import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../assets/globalStyles.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Entries from "./Entries.js";
import Form from "./Form.js";

export default function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/entries" element={<Entries />} />
				<Route path="/new" element={<Form />} />
			</Routes>
		</BrowserRouter>
	);
}