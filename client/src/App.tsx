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
import NotAllowedPage from "./pages/NotAllowedPage/NotAllowedPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import { SessionProvider } from "./contexts/SessionHook";

const Router: React.FC = () => {
  const { user } = useUserContext();
  const userRoutes = (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/search-restaurants/:query" element={<SearchPage />} />
      <Route path="/restaurants/:id" element={<RestaurantPage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/profile/" element={<ProfilePage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/edit-review" element={<EditReviewPage />} />
      <Route path="/change-password" element={<EditPasswordPage />} />
    </>
  );
  const ownerRoutes = (
    <>
      <Route path="/owner/:id" element={<RestaurantPage />} />
    </>
  );
  return (
    <Routes>
      {user?.ownedRestoId ? ownerRoutes : userRoutes}
      <Route path="*" element={<NotAllowedPage/>} />
    </Routes>
  );
};

function App() {
  return (
	<SessionProvider>
		<UserProvider>
		<Navbar />
		<Router />
		</UserProvider>
	</SessionProvider>
  );
}

export default App;
