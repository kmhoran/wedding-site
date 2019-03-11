import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import MenuLogo from "./menuLogo";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import RsvpDialog from '../rsvp'

import "./mobileBar.css";

import { menuItems } from "./menuContents";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {},
  icon: {
    // margin: theme.spacing.unit * 0.7,
    fontSize: "0.7em"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  linkText:{
    tetDecoration: "none",
    color: 'red'
  }
});

class MobileBar extends React.Component {
  constructor(props){
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  state = {
    openDrawer: false
  };

  toggleDrawer = setOpen => () => {
    this.setState({
      openDrawer: setOpen
    });
  };

  render() {
    if (!this.state) return <div />;
    const { classes } = this.props;

    const renderItems = items =>{
      if (!items) return;
      const menuArray = [];
      items.forEach((item, index) => {
        if(!item.rsvpDialog){
          menuArray.push(
           <Link underline="none" 
                  color="text-primary"
                  to={item.url} >
              <ListItem 
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
                key={index}>
                <ListItemText  className="mobile-menu-item"
                primary={item.displayName} />
              </ListItem>
            </Link>
          );
        }
        else{
          menuArray.push(
            <RsvpDialog onClose={this.toggleDrawer(false)}>
              <ListItem 
              key={index}>
                <ListItemText  className="mobile-menu-item"
                primary={item.displayName} />
              </ListItem>
            </RsvpDialog>
          );
        }
       
      });
      return menuArray;
    }

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button 
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
              dense={true}
              key="close-arrow">
              <Icon
                className={classNames(classes.icon, "fas fa-angle-right")}
              />
              Close
          </ListItem>
        </List>
        <Divider />
        <List>
          {renderItems(menuItems)}
        </List>
      </div>
    );

    return (
      <div className={classes.root} id="mobile-bar">
        <AppBar position="static" color="primary" position="fixed">
          <Toolbar variant={'dense'}>
            <MenuLogo short/>
            <Typography variant="h6" color="inherit" className={classes.grow}/>
            <IconButton
              className={classes.menuButton}
              size="small"
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <Icon className={classNames(classes.icon, "fas fa-bars")} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={this.state.openDrawer}
          onClose={this.toggleDrawer(false)}
        >
          <div
            tabIndex={0}
            role="button"
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}
MobileBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MobileBar);
