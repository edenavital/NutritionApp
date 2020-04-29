import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { connect } from "react-redux";
import { increaseDecreaseFood, removeFood } from "../../redux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#008000d4",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#80808069",
    },
  },
}))(TableRow);

class Foodtable extends Component {
  decreaseFood = (foodid) => {
    const { token, increaseDecreaseFood, removeFood } = this.props;

    const foodData = {
      foodid: foodid,
    };

    axios
      .post("/api/decreaseFood", foodData, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log("BACK TO FRONTEND, res.data: ", res.data);
        //show notification or something ...
        const selectedFood = res.data.selectedFood;
        const foodRemoved = res.data.foodRemoved;

        if (foodRemoved !== true) {
          increaseDecreaseFood(selectedFood);
        } else {
          removeFood(foodData);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { food } = this.props;
    return (
      <TableContainer classes={{ root: "table-container" }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Food Name</StyledTableCell>
              <StyledTableCell>Calories Per Unit</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>

          {food.length > 0 && (
            <TableBody>
              {food.map((row) => (
                <StyledTableRow key={row.foodid}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontWeight: 600 }}
                  >
                    {row.foodname}
                  </StyledTableCell>
                  <StyledTableCell>{row.calories}</StyledTableCell>
                  <StyledTableCell>{row.quantity}</StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton
                      style={{
                        outline: "none",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => this.decreaseFood(row.foodid)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}

          {food.length < 1 && (
            <TableHead>
              <TableRow component="tr">
                <TableCell align="center" variant="head" colSpan={4}>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>
                    To get started, Click on the "Add Food" section from the
                    menu !
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
          )}
        </Table>
      </TableContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseDecreaseFood: (selectedFood) =>
      dispatch(increaseDecreaseFood(selectedFood)),
    removeFood: (selectedFood) => dispatch(removeFood(selectedFood)),
  };
};

export default connect(null, mapDispatchToProps)(Foodtable);
