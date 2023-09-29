import React from "react";
import "./AvatarPicker.css";

let imgs = [
  "/bird.svg",
  "/dog.svg",
  "/fox.svg",
  "/frog.svg",
  "/lion.svg",
  "/owl.svg",
  "/tiger.svg",
  "/whale.svg",
];

const AvatarPicker = ({ profileImage, setProfileImage }) => {
  const handleAvatarChange = (src) => {
    setProfileImage(src);
  };
  console.log(profileImage);
  return (
    <div>
      Choose Your Avatar:
      <div className="avatarContainer">
        {imgs.map((avatar, index) => (
          <img
            className={
              profileImage === avatar ? "avatarImage avatar" : "avatar"
            }
            src={avatar}
            style={{ width: "50px", height: "50px" }}
            key={index}
            onClick={() => handleAvatarChange(avatar)}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarPicker;
