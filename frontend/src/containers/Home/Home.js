import React, { useState, useEffect } from "react";
import Icon from "../../components/Icon/Icon";
import { connect } from "react-redux";
import Pie from "../../components/Pie/Pie";
import Foodtable from "../../components/Foodtable/Foodtable";
import { Breakpoint } from "react-socks";
import { optionsDefault, optionsMobile } from "../../components/Pie/pieOptions";
import { ROUTERPATHS } from "../../constants/constants";
import ProfileAvatar from '../../components/ProfileAvatar/ProfileAvatar'
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CardSection from '../../components/CardSection/CardSection';
import { calculateDailyCalories } from '../../redux'

// const useStyles = makeStyles((theme) => ({
//   root: {
//       backgroundColor: "#008000d4",
//   },
//   homeSection: {
    
//   }
  
// }));

const Home = ({ name, bmr, currentCalories }) => {  

  const getTip = () => {
    const fullPrecentages = (currentCalories / bmr) * 100;
    const roundedPrecentages = Math.floor(fullPrecentages / 10) * 10;
    return `You consumed ${roundedPrecentages >= 50 ? 'more' : 'less'} than ${roundedPrecentages > 100 ? 100 : roundedPrecentages}% of your daily consumption`;
  }

  useEffect(() => {
    calculateDailyCalories();
  }, [])

    return (
      <div className="Home">
      
        <div className="home-top-wrapper">
          <div className="home-top">
            <ProfileAvatar />
          </div>
        </div>

        <div className="home-bottom-wrapper">
          {name && <h4 style={{textTransform: "capitalize"}}>Welcome {name}</h4>}
          <CardSection
            topTitle={`Your BMR calculation is ${bmr}`}
            bottomTitle={`You consumed ${currentCalories} calories today`}
            bottomSubtitle={getTip()}
          />
          
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

const mapStateToDispatch = (dispatch) => {
  return {
    calculateDailyCalories: () => dispatch(calculateDailyCalories())
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Home);
