import React, { Component } from "react";
import "./FoodItem.css";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import { connect } from "react-redux";
import { addFood, increaseDecreaseFood, calculateDailyCalories } from "../../redux";
const FoodItem = ({ token, id, name, addFood, increaseDecreaseFood, calories, ...props }) => {
  
  const onClickFood = async () => {
    console.log("onClickFood invoked !");
    console.log("FROM FOODITEM ,SELECT FOOD ID IS: ", id);

    const newFood = {
      foodid: id,
      foodname: name,
      calories: calories.toFixed(0),
    };
    
    try {
      const res = await axios.post("/api/increaseFood", newFood, { headers: { Authorization: token } })
      console.log("BACK TO FRONTEND, res.data: ", res.data);
      const addedFood = res.data.addedFood;
      if (addedFood.quantity > 1) {
        increaseDecreaseFood(addedFood);
      } else {
        addFood(addedFood);
      }
      calculateDailyCalories()
    } catch (err) {
      console.log(err)
    }
  }    

    return (
      <div className="FoodItem">
        <div className="food">
          <img
            src={props.img.thumb}
            width="50px"
            height="50px"
            alt="food"
          />
          <h4>{props.name}</h4>
          <p>{calories.toFixed(0)}</p>
        </div>

        <MdAddCircle className="h2" onClick={onClickFood} />
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFood: (newFood) => dispatch(addFood(newFood)),
    increaseDecreaseFood: (newFood) => dispatch(increaseDecreaseFood(newFood)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);
