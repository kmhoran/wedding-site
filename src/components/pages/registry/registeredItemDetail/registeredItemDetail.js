import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
// import Chip from "@material-ui/core/Chip";
import WebBar from "../../../menuBars/webBar";
import MobileBar from "../../../menuBars/mobileBar";
import Footer from "../../footer";

import routes from "../../../../constants/routes";
import RegistryProgress from "../registryProgress/registryProgress";
import HoneymoonLogo from "../honeymoonLogo/honeymoonLogo";
// import FormatCurrency from "../formatCurrency/formatCurrency";
import ContributionCheckout from "../checkout/contributionCheckout/contributionCheckout";
import { items } from "../regiser";
import "./registeredItemDetail.css";

const styles = theme => ({
  pageFrame: {
    padding: "1em",
    margin: "auto",
    maxWidth: 890,
    minHeight: "80vh"
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: "1em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontSize: "1.5em",
    textAlign: "center",
    paddingBottom: "5px"
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  honeymoon: {
    backgroundColor: "rgb(255, 200, 232)"
  },
  icon: {
    margin: theme.spacing.unit * 0.7,
    fontSize: "1em"
  },
  imageEntourage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  imageFrame: {
    height: "20em",
    maxWidth: 240,
    overflow: "hidden"
  },
  image: {
    height: "100%"
  },
  businessEntourage: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  description: {
    fontWeight: 500,
    flexGrow: 1
  },
  price: {
    margin: "5px 0",
    fontWeight: 700
  }
});

class RegisteredItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this._input = null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const item = items.find(i => {
      return i.id === this.props.match.params.id;
    });
    if (!item) this.props.history.push(routes.Registry);
    this.setState({
      loaded: true,
      item
    });
  }

  render() {
    if (!this.state || !this.props || !this.state.item) return <div />;
    const { classes } = this.props;
    const { item } = this.state;

    const rootClasses = `${classes.root}  detail-page`.concat(
      item.honeymoon ? ` ${classes.honeymoon}` : ""
    );
    return (
      <div>
        <MobileBar />
        <WebBar />
        <div className={classes.pageFrame}>
          <Link to={routes.Registry}>
            <Button size="small" color="default" variant="contained">
              <Icon className={classNames(classes.icon, "fas fa-angle-left")} />{" "}
              Back To Registry
            </Button>
          </Link>
          <Paper className={rootClasses} elevation={3}>
            <div className={classes.title}>{item.name}</div>
            <div className={classes.body}>
              <div class={classes.imageEntourage}>
                <div className={classes.imageFrame}>
                  <img
                    className={classes.image}
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                {item.honeymoon && <HoneymoonLogo />}
                <RegistryProgress item={item} />
              </div>
              <div className={classes.businessEntourage}>
                <div className={classes.description}>
                  {item.price && (
                    <Typography
                      color="secondary"
                      variant="h6"
                      component="h6"
                      className={classes.price}
                    >
                      $ {item.price}
                    </Typography>
                  )}
                  {!item.purchaseOutright && (
                    <ContributionCheckout item={item} />
                  )}
                  {/* {checkout()} */}
                  <div />
                </div>
              </div>
            </div>
          </Paper>
        </div>
        <Footer />
      </div>
    );
  }
}

RegisteredItemDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisteredItemDetail);
