import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Upload,
  Award,
  Calendar,
  Briefcase,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [profileData, setProfileData] = useState({
    userId: "",
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    skills: "",
    experience: "",
    picture: user?.picture || ""
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.picture || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?.email) throw new Error("User email is not available.");
        
        const response = await axios.get(`http://localhost:5000/api/user?email=${user.email}`);
        const userData = response.data;
        
        setProfileData({
          userId: userData._id || "",
          name: userData.name || user.name || "",
          email: userData.email || user.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          skills: userData.skills || "",
          experience: userData.experience || "",
          picture: userData.picture || user.picture || ""
        });
        
        setPreviewUrl(userData.picture || user.picture || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If user not found, set basic info from Auth0
        setProfileData(prev => ({
          ...prev,
          name: user?.name || "",
          email: user?.email || "",
          picture: user?.picture || ""
        }));
        setPreviewUrl(user?.picture || "");
        setLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      
      setProfilePhotoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (profileData.phone && !/^\+?[\d\s-()]+$/.test(profileData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (profileData.experience && (isNaN(profileData.experience) || Number(profileData.experience) < 0)) {
      newErrors.experience = "Experience should be a valid number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadProfilePhoto = async () => {
    if (!profilePhotoFile) return profileData.picture;
    
    try {
      const formData = new FormData();
      formData.append("profilePhoto", profilePhotoFile);
      
      // This would be your actual upload endpoint
      // const response = await axios.post("/upload/profile-photo", formData);
      // return response.data.photoUrl;
      
      // For now, return the current preview URL
      return previewUrl;
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload profile photo");
      return profileData.picture;
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }
    
    setSaving(true);
    
    try {
      // Upload photo first if there's a new one
      const photoUrl = await uploadProfilePhoto();
      
      const updatedData = {
        ...profileData,
        picture: photoUrl
      };
      
      if (profileData.userId) {
        // Update existing user
        await axios.put(`http://localhost:5000/api/user/${profileData.userId}`, updatedData);
      } else {
        // Create new user
        const response = await axios.post("http://localhost:5000/api/user", updatedData);
        setProfileData(prev => ({ ...prev, userId: response.data._id }));
      }
      
      setProfileData(updatedData);
      setIsEditing(false);
      setProfilePhotoFile(null);
      
      toast.success("Profile updated successfully!", {
        duration: 4000,
        icon: '✅'
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    setProfilePhotoFile(null);
    setPreviewUrl(profileData.picture || user?.picture || "");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4A261]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-8 h-8 text-[#F4A261] mr-3" />
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      saving 
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white hover:shadow-lg"
                    }`}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Photo Section */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-xl shadow-lg p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Photo</h2>
                
                <div className="text-center">
                  <div className="relative inline-block">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#F4A261] shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E76F51] flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                        {getInitials(profileData.name)}
                      </div>
                    )}
                    
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-[#F4A261] p-2 rounded-full cursor-pointer hover:bg-[#E76F51] transition shadow-lg">
                        <Camera className="w-4 h-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="sr-only"
                        />
                      </label>
                    )}
                  </div>
                  
                  {isEditing && (
                    <p className="text-sm text-gray-500 mt-4">
                      Click the camera icon to upload a new photo
                      <br />
                      <span className="text-xs">Max size: 5MB</span>
                    </p>
                  )}
                </div>

                {/* Profile Stats */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-[#F4A261] mr-2" />
                      <span className="text-gray-600">Experience</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {profileData.experience ? `${profileData.experience} years` : "Not specified"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600">Account Status</span>
                    </div>
                    <span className="font-semibold text-green-600">Verified</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">Member Since</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {user?.updated_at ? new Date(user.updated_at).getFullYear() : "2024"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Profile Information */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white rounded-xl shadow-lg p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
                
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-2" />
                      Full Name *
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent ${
                          errors.name ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.name || "Not provided"}
                      </p>
                    )}
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email Address *
                    </label>
                    <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                      {profileData.email}
                      <span className="text-xs text-gray-500 ml-2">(Cannot be changed)</span>
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent ${
                          errors.phone ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="+91 9876543210"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.phone || "Not provided"}
                      </p>
                    )}
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent"
                        placeholder="Enter your complete address"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.address || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="inline w-4 h-4 mr-2" />
                      Skills
                    </label>
                    {isEditing ? (
                      <textarea
                        name="skills"
                        value={profileData.skills}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent"
                        placeholder="List your skills (e.g., cleaning, plumbing, electrical work)"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.skills || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Award className="inline w-4 h-4 mr-2" />
                      Years of Experience
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="experience"
                        value={profileData.experience}
                        onChange={handleInputChange}
                        min="0"
                        max="50"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F4A261] focus:border-transparent ${
                          errors.experience ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="0"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.experience ? `${profileData.experience} years` : "Not provided"}
                      </p>
                    )}
                    {errors.experience && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.experience}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;