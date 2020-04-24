import React, { Component } from "react";
import "./FoodItem.css";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import { connect } from "react-redux";
import { addFood, increaseFood } from "../../redux";
class FoodItem extends Component {
  onClickFood = () => {
    const { token, id, name, addFood, increaseFood, calories } = this.props;

    console.log("onClickFood invoked !");
    console.log("FROM FOODITEM ,SELECT FOOD ID IS: ", id);

    const newFood = {
      foodid: id,
      foodname: name,
      calories: calories.toFixed(0),
    };

    axios
      .post("/api/increaseFood", newFood, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log("BACK TO FRONTEND, res.data: ", res.data);
        const addedFood = res.data.addedFood;

        if (addedFood.quantity > 1) {
          increaseFood(addedFood);
        } else {
          addFood(addedFood);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="FoodItem">
        <div className="food">
          <img
            src={this.props.img.thumb}
            width="50px"
            height="50px"
            alt="food"
          />
          <h4>{this.props.name}</h4>
          <p>{this.props.calories.toFixed(0)}</p>
        </div>

        <MdAddCircle className="h2" onClick={this.onClickFood} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFood: (newFood) => dispatch(addFood(newFood)),
    increaseFood: (newFood) => dispatch(increaseFood(newFood)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);
