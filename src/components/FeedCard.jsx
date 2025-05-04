import React from "react";
import  batch  from "../assets/tickmark.png"

const FeedCard = ({user, updateUserRequest}) => {
  const { firstName, lastName, profilePic, age, about, gender, _id, isPremium } = user;

  const handleRequest = (status) => {
    updateUserRequest(status, _id)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 w-80 flex flex-col items-start text-white">
        <div className="w-full flex justify-center">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-50 h-50 border border-white/30  rounded-2xl  shadow-md mb-4"
          />
        </div>
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">{firstName + " " + lastName}</h2>
          {isPremium &&
              <img src={batch} alt="icon" className="h-7 w-7 mx-1" />
          }
        </div>
        <p>{age}, {gender}</p>
        <p>{about}</p>
        <div className="w-full flex justify-center space-x-4 mt-4">
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
            onClick={() => () => handleRequest("ignored")}
          >
            Ignore
          </button>
          <button className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
            onClick={() => handleRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
