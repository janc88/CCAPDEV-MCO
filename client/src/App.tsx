import React from "react";
import Navbar from "./components/Navbar/Navbar";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { UserProvider, useUserContext } from "./contexts/UserContext";
import EditReviewPage from "./pages/EditReviewPage/EditReviewPage";
import EditPasswordPage from "./pages/EditPasswordPage/EditPasswordPage";

const Router: React.FC = () => {
	const { user } = useUserContext();
	const userRoutes = (<>
		<Route path="/login" element={<LoginPage />} />
		<Route path="/signup" element={<SignupPage />} />
		<Route path="/search-restaurants/:query" element={<SearchPage />} />
		<Route path="/restaurants/:id" element={<RestaurantPage />} />
		<Route
		path="/profile/:userId"
		element={<ProfilePage/>}
		/>
		<Route
		path="/profile/"
		element={<ProfilePage/>}
		/>
		<Route path="/edit-profile" element={<EditProfilePage />} />
		<Route path="/edit-review" element={<EditReviewPage />} />
		<Route path="/change-password" element={<EditPasswordPage />} />
	</>);
	const ownerRoutes = (<>
		<Route path="/owner" element={<h1>TODO</h1>} />
		<Route element={<h1>TODO</h1>} />
	</>);
	return (
	<Routes>
	  <Route path="/" element={<HomePage />} />
	  <Route path="/home" element={<HomePage />} />
	  {user?.ownedRestoId ? ownerRoutes : userRoutes}
	</Routes>
	);
};

function App() {
  return (
    <UserProvider>
      <Navbar />
	  <Router />
    </UserProvider>
  );
}

export default App;
