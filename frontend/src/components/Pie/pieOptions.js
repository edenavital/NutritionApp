export const optionsDefault = {
  width: 450,
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

  legend: {
    show: true,
    showForSingleSeries: true,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: "right",
    horizontalAlign: "center",
    floating: false,
    fontSize: "14px",
    fontFamily: "Poppins, Arial",
    fontWeight: 400,
    tooltipHoverFormatter: undefined,
    offsetX: 0,
    offsetY: 0,
    markers: {
      width: 11,
      height: 11,
      strokeWidth: 0,
      strokeColor: "#fff",
      radius: 12,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
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
      fontWeight: "bold",
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
            fontWeight: 600,
            fontFamily: "Poppins, Arial",
            color: undefined,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "Poppins, Arial",
            color: undefined,
            offsetY: 16,
          },
          total: {
            show: true,
            showAlways: false,
            label: "Total",
            fontFamily: "Poppins, Arial",
            fontSize: "22px",
            fontWeight: 600,
            color: "#373d3f",
          },
        },
      },
    },
  },
};

export const optionsMobile = {
  width: 350,
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

  legend: {
    show: true,
    showForSingleSeries: true,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: "right",
    horizontalAlign: "center",
    floating: false,
    fontSize: "14px",
    fontFamily: "Poppins, Arial",
    fontWeight: 400,
    tooltipHoverFormatter: undefined,
    offsetX: 0,
    offsetY: 0,
    markers: {
      width: 11,
      height: 11,
      strokeWidth: 0,
      strokeColor: "#fff",
      radius: 12,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
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
      fontSize: "8px",
      fontWeight: "bold",
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
            fontSize: "8px",
            fontWeight: 600,
            fontFamily: "Poppins, Arial",
            color: undefined,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "8px",
            fontWeight: 400,
            fontFamily: "Poppins, Arial",
            color: undefined,
            offsetY: 16,
          },
          total: {
            show: true,
            showAlways: false,
            label: "Total",
            fontFamily: "Poppins, Arial",
            fontSize: "8px",
            fontWeight: 600,
            color: "#373d3f",
          },
        },
      },
    },
  },
};
