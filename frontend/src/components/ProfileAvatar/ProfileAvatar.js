import React, { Component } from "react";
import { MdCameraAlt } from "react-icons/md";
import Avatar from "@material-ui/core/Avatar";
import { setImage } from "../../redux";
import { connect } from "react-redux";

class ProfileAvatar extends Component {
  fileInput = React.createRef();

  //Returns true if a file's type is an image
  isFileImage = (file) => {
    return file && file["type"].split("/")[0] === "image";
  };

  uploadImage = async (e) => {
    const { setImage } = this.props;
    const files = e.target.files;
    if (!files) return;

    const isImage = this.isFileImage(files[0]);
    if (!isImage) {
      console.log("THE FILE IS NOT AN IMAGE ! - SHOW ERROR NOTIFICATION");
    } else {
      setImage(files);
    }
  };

  render() {
    const { loading, avatar } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Avatar
          alt="USER'S FIRST NAME"
          src={avatar}
          style={{
            height: 100,
            width: 100,
            position: "relative",
          }}
          onClick={() => this.fileInput.current.click()}
        />
        {!avatar && (
          <MdCameraAlt
            style={{
              height: 20,
              width: 20,
              position: "absolute",
              top: "90%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
            }}
          />
        )}

        <input
          ref={this.fileInput}
          type="file"
          accept="image/*"
          name="file"
          style={{ display: "none" }}
          onChange={this.uploadImage}
        ></input>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    avatar:
      state.user.credentials &&
      state.user.credentials[0] &&
      state.user.credentials[0].avatar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setImage: (file) => dispatch(setImage(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);
