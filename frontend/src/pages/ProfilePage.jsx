import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [profileData, setProfileData] = useState({
    userId: "", // Store user ID
    firstname: "",
    lastname: "",
    number: "",
    email: user?.email || "",
    address: "",
    skill: "",
    experience: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?.email) throw new Error("User email is not available.");
        const response = await axios.get(`/user?email=${user.email}`);
        const userData = response.data;
        
        console.log("Fetched User Data:", userData); // 🛑 Debugging
  
        setProfileData((prevData) => ({
          ...prevData,
          userId: userData._id || "", // Ensure userId is set
          firstname: userData.name?.split(" ")[0] || "",
          lastname: userData.name?.split(" ")[1] || "",
          email: userData.email || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    if (isAuthenticated) fetchUserData();
  }, [isAuthenticated, user]);

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Profile Data Before Sending:", profileData); // 🛑 Debugging
  
    if (!profileData.userId) {
      alert("User ID is missing. Cannot update profile.");
      return;
    }
  
    try {
      await axios.put("http://localhost:5000/api/profile", profileData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile data:", error);
      alert("An error occurred while saving profile data.");
    }
  };
  

  if (loading) return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile Information</h1>

        <div className="flex justify-center mb-6">
          <label htmlFor="photo-upload" className="cursor-pointer relative">
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 text-4xl font-semibold">{user?.email?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProfilePhoto(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstname" placeholder="First Name" value={profileData.firstname} onChange={handleInputChange} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" />
            <input type="text" name="lastname" placeholder="Last Name" value={profileData.lastname} onChange={handleInputChange} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" />
          </div>
          <input type="tel" name="number" placeholder="Phone Number" value={profileData.number} onChange={handleInputChange} className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400" />
          <input type="email" name="email" placeholder="Email" value={profileData.email} onChange={handleInputChange} className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400" disabled />
          <input type="text" name="address" placeholder="Address" value={profileData.address} onChange={handleInputChange} className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="skill" placeholder="Skill" value={profileData.skill} onChange={handleInputChange} className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="experience" placeholder="Experience" value={profileData.experience} onChange={handleInputChange} className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400" />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
