import React from "react";
import { connect } from "react-redux";
import "./SideDrawer.css";
import { Link } from "react-router-dom";
import { Button, Drawer } from "@material-ui/core"

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { SIDE_DRAWER_OPTIONS, ROUTERPATHS } from '../../constants/constants'
import { withRouter } from 'react-router'
import AddCircleIcon from '@material-ui/icons/AddCircle';

const SideDrawer = ({ isDrawerVisible, toggleSideDrawer, history, logout, setDisplayedPage }) => {

  const getIcon = (to) => {
    switch (to) {
      case ROUTERPATHS.HOME:
        return <HomeIcon />
      case ROUTERPATHS.FOOD:
        return <AddCircleIcon />
      case ROUTERPATHS.FOOD_LIST:
        return <FastfoodIcon />
      case ROUTERPATHS.LOGIN:
        return <ExitToAppIcon />
      default:
        return null
    }
  }

  const onClickItem = (opt) => {
    setDisplayedPage(opt.label)
    toggleSideDrawer();

    if (opt.to === ROUTERPATHS.LOGIN) {
      logout();
    } else {
      history.push(opt.to)
    }
  }
  
  const list = () => (
    <div
      role="presentation"
      style={{width: 250}}
    >
      <List>
        {SIDE_DRAWER_OPTIONS.map((opt, index) => (
          <ListItem button key={opt.label + index} onClick={onClickItem.bind(this, opt)}>
            <ListItemIcon>{getIcon(opt.to)}</ListItemIcon>
            <ListItemText primary={opt.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment >
        <Drawer anchor={'left'} open={isDrawerVisible} onClose={toggleSideDrawer}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isDrawerVisible: state.app.isDrawerVisible,
  };
};


export default connect(mapStateToProps, null)(withRouter(SideDrawer));
