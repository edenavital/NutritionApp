import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
      backgroundColor: "#008000d4",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    marginLeft: 'auto',
    outline: 'none !important'
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    },
    currentPage: {
        position: 'absolute',
        left: "50%",
        top: "50%",
        transform: 'translate(-50%, -50%)'
    },
    logout: {
        transition: `0.5s color` ,
        outline: "none",
        cursor: "pointer",
        "&:hover": {
            color: "red",
        }
    },
    iconMenuWrapper: {        
        outline: "none !important",
        cursor: "pointer",
    }
}));

const Header = ({toggleSideDrawer, logout, displayedPage, }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{root: classes.root}}>
        <Toolbar>
          <IconButton
            edge="start"
            classes={{ root: `${classes.iconMenuWrapper} ${classes.menuButton}` }}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSideDrawer}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography className={classes.title} variant="h6" noWrap>
            Nutrition App
          </Typography>
          
          <Typography className={classes.currentPage} variant="h6" noWrap>
            {displayedPage}
          </Typography>
          {/* <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div> */}

        <div className={classes.sectionDesktop}>
            <IconButton color="inherit" classes={{root: `${classes.iconMenuWrapper} ${classes.logout}` }} onClick={logout}>
                <ExitToAppIcon />
            </IconButton>
        </div>
                  
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;