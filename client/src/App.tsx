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
import { UserProvider } from "./contexts/UserContext";
import { userInfo } from "./data/data";
import EditReviewPage from "./pages/EditReviewPage/EditReviewPage";
import AboutRestoCard from "./pages/RestaurantPage/AboutRestoCard";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/restaurants" element={<SearchPage />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
        <Route
          path="/profile"
          element={
            <ProfilePage
              username={userInfo.username}
              description={userInfo.description}
              profilePic={userInfo.profilePic}
              reviews={userInfo.reviews}
            />
          }
        />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/edit-review" element={<EditReviewPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;