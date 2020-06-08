import React, { Component } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ProfileAvatar from "../../components/ProfileAvatar/ProfileAvatar";

class Profile extends Component {
  render() {
    return (
      <div
        style={{
          height: "828px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div className="profile-top-div">
          <div className="profile-bar">
            <MdKeyboardArrowLeft className="icons" />
            <p>Profile</p>
          </div>
        </div>
        <div className="profile-bottom-div">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0px auto",
              position: "relative",
              top: "-50px",
            }}
          >
            <ProfileAvatar />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
