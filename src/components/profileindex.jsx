import React, { useState } from 'react';
import UserProfileDisplay from './UserProfileDisplay';
import UserProfileForm from './updateProfile';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Learning enthusiast!',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const [achievements] = useState([
    { id: 1, name: 'Completed First Course', badge: '🥇' },
    { id: 2, name: '5 Hours of Learning', badge: '📚' },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserInfo((prev) => ({ ...prev, profilePicture: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const saveProfile = () => {
    console.log('Profile updated:', userInfo);
    setIsEditing(false);
  };

  return (
    <div className="pt-20 pb-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>
        {isEditing ? (
          <UserProfileForm
            userInfo={userInfo}
            onInputChange={handleInputChange}
            onProfilePictureChange={handleProfilePictureChange}
            onSave={saveProfile}
            onCancel={toggleEditMode}
          />
        ) : (
          <UserProfileDisplay
            userInfo={userInfo}
            achievements={achievements}
            onEdit={toggleEditMode}
          />
        )}
      </div>
    </div>
  );

};

export default UserProfile;

