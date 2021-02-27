import React, { useState } from "react";
import "./Home.css";
import Icon from "../../components/Icon/Icon";
import { connect } from "react-redux";
import Pie from "../../components/Pie/Pie";
import Foodtable from "../../components/Foodtable/Foodtable";
import { Breakpoint } from "react-socks";
import { optionsDefault, optionsMobile } from "../../components/Pie/pieOptions";
import { ROUTERPATHS } from "../../constants/constants";
import ProfileAvatar from '../../components/ProfileAvatar/ProfileAvatar'
import { Typography } from "@material-ui/core";

const Home = ({ name, bmr, currentCalories }) => {  
  
  const getTip = () => {
    const fullPrecentages = (currentCalories / bmr) * 100;
    const roundedPrecentages = Math.floor(fullPrecentages / 10) * 10;
    return `You consumed ${roundedPrecentages >= 50 ? 'more' : 'less'} than ${roundedPrecentages > 100 ? 100 : roundedPrecentages} of your daily consumption`;
  }

    return (
      <div className="Home">
      
        <div className="home-top-wrapper">
          <div className="home-top">
            <ProfileAvatar />
          </div>
        </div>

        <div className="home-bottom-wrapper">

          {name && <h4>Welcome {name}</h4>}
          {bmr && <Typography>{`Your BMR calculation is ${bmr}`}</Typography>}
          
          <Typography>{ `You consumed ${currentCalories} today` }</Typography>
          <Typography>{ getTip() }</Typography>
        </div>

      </div>
    );
}

const mapStateToProps = ({user}) => {
  return {
    food: user.food,
    name: user.credentials && user.credentials.name,
    token: user.token,
    bmr: user.bmr,
    currentCalories: user.currentCalories
  };
};

export default connect(mapStateToProps, null)(Home);
