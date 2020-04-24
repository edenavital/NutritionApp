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

      options: {
        labels: [],
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1000,
          animateGradually: {
            enabled: true,
            delay: 550,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },

        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          textAnchor: "middle",
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: undefined,
          },
          background: {
            enabled: false,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: true,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.85,
            },
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.85,
          },
        },

        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: undefined,
                  offsetY: -10,
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  color: undefined,
                  offsetY: 16,
                },
                total: {
                  show: true,
                  showAlways: false,
                  label: "Total",
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#373d3f",
                },
              },
            },
          },
        },
      },
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
    //   let { series, options } = this.state;
    let series = [...this.state.series];
    let options = { ...this.state.options };

    food.forEach((food, index) => {
      options.labels.push(`${food.foodname} - ${food.quantity}`);
      series.push(food.calories * food.quantity);

      console.log(options.labels[index]);
      console.log(series[index]);
    });

    this.setState({ series, options });
  };

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="450"
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
