import React from "react";
import "./Food.css";
import Icon from "../Icon/Icon";
import SideDrawer from "../SideDrawer/SideDrawer";
const Food = props => {
  return (
    <div className="Food">
      <SideDrawer />
      <Icon iconName="food" width="100px" height="100px" />

      <main>
        <h4>Use the search bar in order to find food</h4>
        <div className="searchBar">
          <form>
            <input type="search" placeholder="Search your content ..." />
            <i className="fa fa-search"></i>
          </form>
        </div>
      </main>
    </div>
  );
};
export default Food;
