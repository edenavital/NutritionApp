import React, { Component } from "react";
import Icon from "../../components/Icon/Icon";
import { connect } from "react-redux";
import Pie from "../../components/Pie/Pie";
import Foodtable from "../../components/Foodtable/Foodtable";
import { Breakpoint } from "react-socks";
import { optionsDefault, optionsMobile } from "../../components/Pie/pieOptions";

class FoodList extends Component {

  render() {
    const { name, food, token } = this.props;

    return (
      <div className="wrapper">

        <div className="foodlist-bottom-wrapper">
            <main>
              <div className="app pie-container">
                <div className="row pie-row">
                  <div className="mixed-chart">
                    <Breakpoint medium up>
                      {food && food.length > 0 && <Pie options={optionsDefault} />}
                    </Breakpoint>

                    <Breakpoint small down>
                      {food && food.length > 0 && <Pie options={optionsMobile} />}
                    </Breakpoint>
                  </div>
                </div>
              </div>              
              <Foodtable food={food} token={token} />
            </main>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    food: state.user.food,
    name: state.user.credentials && state.user.credentials.name,
    token: state.user.token,
  };
};


export default connect(mapStateToProps, null)(FoodList);
