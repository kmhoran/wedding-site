import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Footer from '../footer';

import routes from "../../../constants/routes";
import { items } from "./regiser";
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
    flexDirection: "row",
    justifyContent: "space-around"
  },
  icon: {
    margin: theme.spacing.unit * 0.7,
    fontSize: "1em"
  },
  imageFrame: {
    height: "20em",

    maxWidth: 240,
    overflow: "hidden",
    margin: "1em"
  },
  image: {
    height: "100%"
  },
  description: {
    fontWeight: 500,
    flexGrow: 1
  },
  price: {
    margin: "5px 0",
    fontWeight: 700
  },
  contributionChipFrame: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    maxWidth: "20em"
  },
  contributionChip: {
    margin: "0.3em 0.1em",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "1.2em",
    padding: "0.7em 0",
    borderRadius: "9999px",
    minWidth: "3.2em",
    textAlign: "center",
    padding: 5
  },
  unselectedContribution: {
    border: "1px solid #1a237e",
    color: "#1a237e"
  },
  selectedContribution: {
    color: "#fff",
    backgroundColor: "#1a237e",
    border: "1px solid #fff"
  },
  contributionInput: {
    maxWidth: "5em"
  },
  checkoutFrame: {
    marginTop: "2em",
    marginLeft: "1em",
    maxWidth: "15em",
    fontSize: "1.2em"
  },
  checkoutLine: {
    margin: "0.5em",
    display: "block"
  },
  checkoutPrice: {
    float: "right"
  },
  processingFee: {
    color: "#1a237e",
    fontSize: "0.85em"
  },
  totalLine: {
    borderTop: "1px solid #000",
    paddingTop: "0.5em",
    margin: "0 0.5em",
    fontWeight: "600"
  },
  disclaimer: {
    margin: theme.spacing.unit * 0.7,
    fontSize: "0.7em",
    display: "inline-table"
  }
});

const contributionSuggestions = [
  { value: 25 },
  { value: 50 },
  { value: 100 },
  { value: 150 },
  { value: 200 },
  { value: 250 },
  { value: 300 },
  { value: 400 },
  { value: 500 }
];

class RegisteredItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this._input = null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const item = items.find(i => {
      return i.id == this.props.match.params.id;
    });
    if (!item) this.props.history.push(routes.Registry);
    this.setState({
      loaded: true,
      item
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._input) this._input.focus();
  }

  selectSuggestedContribution = value => {
    this.setState({
      contribution: value,
      useSuggestedContribution: true,
      useCustomContribution: false
    });
  };
  openCustomContributionInput = () => {
    this.setState({ inputContribution: true });
  };
  closeCustomContributionInput = () => {
    if (!this.state.customContribution) {
      this.setState({
        inputContribution: false
      });
    } else {
      this.setState({
        inputContribution: false,
        useCustomContribution: true,
        useSuggestedContribution: false,
        contribution: this.state.customContribution
      });
    }
  };
  handleCustomContributionKeyPress = e => {
    if (e.key == "Enter") {
      this.closeCustomContributionInput();
    }
  };
  selectCustomContribution = e => {
    const input = e.target.value;
    if (!input) {
      this.setState({
        customContribution: null,
        useCustomContribution: false
      });
      return;
    }
    if (
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{0,2})?$/.test(input)
    ) {
      this.setState({
        customContribution: input,
        contribution: input,
        useCustomContribution: true,
        useSuggestedContribution: false
      });
    }
  };

  formatCurrency = (number, hideDecimal = true) => {
    const floater = parseFloat(Math.round(number * 100) / 100)
      .toFixed(2)
      .toString();
    const splitFloat = floater.split(".");
    if (hideDecimal && number % 1 === 0) {
      return <span>$ {splitFloat[0]}</span>;
    }
    return (
      <span>
        $ {splitFloat[0]}.<sup className="decimal-point">{splitFloat[1]}</sup>
      </span>
    );
  };

  render() {
    if (!this.state || !this.props || !this.state.item) return <div />;
    const { classes } = this.props;
    const {
      item,
      contribution,
      inputContribution,
      customContribution,
      useSuggestedContribution,
      useCustomContribution
    } = this.state;
    const selectedClasses = `${classes.selectedContribution} ${
      classes.contributionChip
    }`;
    const unselectedClasses = `${classes.unselectedContribution} ${
      classes.contributionChip
    }`;

    const processingFee = contribution ? contribution * 0.029 + 0.3 : null;

    const checkout = () => {
      if (
        !contribution ||
        (!useCustomContribution && !useSuggestedContribution)
      )
        return null;
      return (
        <div className={classes.checkoutFrame}>
          <div className={classes.checkoutLine}>
            You Selected{" "}
            <span className={classes.checkoutPrice}>
              {this.formatCurrency(contribution, false)}
            </span>
          </div>
          <div className={classes.checkoutLine}>
            <span className={classes.processingFee}>Processing Fee</span>
            <Icon
              className={classNames(
                classes.disclaimer,
                "fas fa-question-circle"
              )}
              color="secondary"
            />{" "}
            <span className={classes.checkoutPrice}>
              {this.formatCurrency(processingFee, false)}
            </span>
          </div>
          <div className={classes.totalLine}>
            <span>Grand Total</span>{" "}
            <span className={classes.checkoutPrice}>
              {this.formatCurrency(+processingFee + +contribution, false)}
            </span>
          </div>
        </div>
      );
    };

    const contributionPanel = props => {
      return (
        <div className={classes.contributionChipFrame}>
          {contributionSuggestions.map(amount => {
            return (
              <div
                className={
                  useSuggestedContribution && contribution == amount.value
                    ? selectedClasses
                    : unselectedClasses
                }
                onClick={() => {
                  this.selectSuggestedContribution(amount.value);
                }}
              >{`$ ${amount.value}`}</div>
            );
          })}
          <div
            className={
              useCustomContribution ? selectedClasses : unselectedClasses
            }
            onClick={this.openCustomContributionInput}
          >
            {inputContribution ? (
              <span>
                ${" "}
                <input
                  className={classes.contributionInput}
                  value={customContribution || null}
                  onChange={this.selectCustomContribution}
                  onKeyPress={this.handleCustomContributionKeyPress}
                  ref={c => (this._input = c)}
                  onBlur={this.closeCustomContributionInput}
                />
              </span>
            ) : customContribution ? (
              this.formatCurrency(customContribution)
            ) : (
              "Other Amount"
            )}
          </div>
        </div>
      );
    };

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
          <Paper className={`${classes.root} detail-page`} elevation={3}>
            <div className={classes.imageFrame}>
              <img className={classes.image} src={item.image} />
            </div>
            <div className={classes.description}>
              <Typography variant="h6" component="h6">
                {item.name}
              </Typography>
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
              {!item.purchaseOutright && contributionPanel()}
              {checkout()}
              <div />
            </div>
          </Paper>
        </div>
        <Footer/>
      </div>
    );
  }
}

RegisteredItemDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisteredItemDetail);
