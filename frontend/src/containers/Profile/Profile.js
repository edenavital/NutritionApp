import React, { Component } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ProfileAvatar from "../../components/ProfileAvatar/ProfileAvatar";
import IconButton from "@material-ui/core/IconButton";
import { ROUTERPATHS } from "../../constants/constants";
class Profile extends Component {
  navigateBack = () => {
    const { history } = this.props;

    if (history) {
      history.push(ROUTERPATHS.HOME);
    }
  };

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
            <IconButton
              style={{
                outline: "none",
                cursor: "pointer",
                padding: 0,
              }}
              onClick={this.navigateBack}
            >
              <MdKeyboardArrowLeft />
            </IconButton>

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
