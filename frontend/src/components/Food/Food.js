import React, { Component } from "react";
import "./Food.css";
import Icon from "../Icon/Icon";
import SideDrawer from "../SideDrawer/SideDrawer";
import axios from "axios";
import FoodItem from "../FoodItem/FoodItem";
import { connect } from "react-redux";
import { fetchRequestLoader } from "../../redux";
import Loader from "../Loader/Loader";
class Food extends Component {
  state = {
    search: "",
    foodList: [{}],
  };

  handleInputChange = (e) => {
    this.setState({ search: e.target.value });
  };

  onSubmitForm = (e) => {
    this.setState({ foodList: [] });
    e.preventDefault();
    const search = this.state.search;

    console.log(`Sending to API the following query string:
            search - ${search}
        `);
    this.props.fetchRequestLoader();
    axios
      .get(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${search}&detailed=true`,
        {
          headers: {
            "x-app-id": "9b7a7cb0",
            "x-app-key": "91ef974114a25914afae4c527cbc377a",
          },
        }
      )
      .then((res) => {
        //Get only common foods from the API
        let data = res.data.common;
        console.log("ARRAY BEFORE FILTER IS:", data);
        //Filtering out any duplicates (Any objects that their tag_id property is idenical to a different one)

        for (let i = 0; i < data.length; i++) {
          let storedTag = data[i].tag_id;
          console.log("storedTag: ", storedTag);

          //CONVERT THIS TO WHILE
          for (let j = i + 1; j < data.length - 1; j++) {
            let currentTag = data[j].tag_id;
            console.log("currentTag: ", currentTag);
            if (storedTag === currentTag) {
              console.log(
                "DELETE THE OBJECT BECAUSE THEY ARE THE SAME: ",
                data[j]
              );
              data.splice(j, 1);
              //RETURN BACK TO i IN ORDER TO FIND MORE OF THE SAME TAG_ID...
              j = i;
            }
          }
        }

        this.props.fetchRequestLoader();
        console.log("NEW FILTERED ARRAY IS: ", data);
        this.setState({ foodList: data });
      })

      .catch((err) => {
        this.props.fetchRequestLoader();
        console.log(err);
      });
  };

  // getCalories = full_nutrients => {
  //   full_nutrients.map(nutrient => {
  //     if (nutrient.attr_id === 208) {
  //       //console.log("Found calroies:", nutrient.value);
  //       return nutrient.value;
  //     }
  //   });

  //   return 0;
  // };

  render() {
    let foods = "";
    let calories = 0;
    if (this.state.foodList.length > 1) {
      foods = this.state.foodList.map((food) => {
        //In order to get the calories: create a seperated function for that... doesnt look good... async await should work
        //console.log("Current food is: ", food);
        food.full_nutrients.forEach((nutrient) => {
          if (nutrient.attr_id === 208) {
            calories = nutrient.value;
          }
        });

        return (
          <FoodItem
            key={food.tag_id}
            name={food.food_name}
            img={food.photo}
            calories={calories}
          />
        );
      });
    }

    return (
      <div className="Food">
        {this.props.loading ? <Loader /> : null}
        <SideDrawer />
        <Icon iconName="food" width="100px" height="100px" />

        <main>
          <h4>Use the search bar in order to find food</h4>
          <div className="searchBar">
            <form onSubmit={this.onSubmitForm}>
              <input
                type="search"
                placeholder="Search food . . ."
                value={this.state.search}
                id="search"
                onChange={this.handleInputChange}
              />
              <i className="fa fa-search"></i>
            </form>
          </div>
        </main>

        <div className="Foods">{foods}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.app.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequestLoader: () => dispatch(fetchRequestLoader()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Food);
