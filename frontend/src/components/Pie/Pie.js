import React, { Component } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class Pie extends Component {
  constructor(props) {
    super(props);

    //SERIES : calories
    //labels - name of food
    //keep in mind that the order is important

    this.state = {
      series: [],
      options: this.props.options,
    };
  }

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.food !== this.props.food) {
      this.updateData();
    }
  }

  updateData = () => {
    const { food } = this.props;

    let series = [];
    let options = { ...this.props.options, labels: [] };

    food.forEach((food, index) => {
      options.labels.push(`${food.foodname} - ${food.quantity}`);
      series.push(food.calories * food.quantity);
    });

    this.setState({ series, options });
  };

  render() {
    const { width } = this.props.options;
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width={width}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    food: state.user.food,
  };
};

export default connect(mapStateToProps, null)(Pie);
