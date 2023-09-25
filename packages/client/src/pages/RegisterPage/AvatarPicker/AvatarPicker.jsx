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
      {imgs.map((avatar, index) => (
        <img
          className={profileImage === avatar ? "avatarImage avatar" : "avatar"}
          src={avatar}
          style={{ width: "80px", height: "80px" }}
          key={index}
          onClick={() => handleAvatarChange(avatar)}
        />
      ))}
    </div>
  );
};

export default AvatarPicker;