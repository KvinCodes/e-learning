// UserProfileDisplay.jsx
import React from 'react';

const UserProfileDisplay = ({ userInfo, achievements, onEdit }) => {
  return (
    <>
      <div className="flex items-center mb-8 px-6">
        <div className="relative w-32 h-32">
          <img
            src={userInfo.profilePicture}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
        </div>
        <div className="ml-8 flex-1">
          <h2 className="text-xl font-bold text-gray-800">{userInfo.name}</h2>
          <p className="text-gray-600">{userInfo.email}</p>
          <p className="text-gray-700 mt-4">{userInfo.bio}</p>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Edit Profile
      </button>
      <h2 className="text-2xl font-bold mt-10 mb-6 text-center">Achievements & Badges</h2>
      <ul className="grid grid-cols-2 gap-6 px-6">
        {achievements.map((achievement) => (
          <li
            key={achievement.id}
            className="p-6 bg-gray-100 rounded-lg shadow flex items-center justify-between"
          >
            <span className="text-lg font-semibold text-gray-800">{achievement.name}</span>
            <span className="text-3xl">{achievement.badge}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserProfileDisplay;