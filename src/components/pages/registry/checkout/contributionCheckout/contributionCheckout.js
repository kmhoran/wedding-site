import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// import classNames from "classnames";
import CheckoutMath from "../checkoutMath/checkoutMath";
import FormatCurrency from "../../formatCurrency/formatCurrency";

const styles = theme => ({
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
    // padding: "0.7em 0",
    borderRadius: "9999px",
    minWidth: "3.2em",
    textAlign: "center",
    padding: 5
  },
  unselectedContribution: {
    border: "1px solid #000",
    color: "#000",
    backgroundColor: "rgba(255,255,255,0.7)"
  },
  selectedContribution: {
    color: "#fff",
    backgroundColor: "#000",
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
    color: "000",
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

class ContributionCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    if (e.key === "Enter") {
      this.closeCustomContributionInput();
    }
  };

  selectCustomContribution = e => {
    const input = e.target.value;
    if (!input) {
      const suggestedValue = contributionSuggestions.find(
        i => i.value === this.state.contribution
      );
      const newContribution =
        suggestedValue != null ? suggestedValue.value : null;
      this.setState({
        customContribution: null,
        useCustomContribution: false,
        contribution: newContribution
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

  render() {
    if (!this.state || !this.props) return <div />;
    const {
      contribution,
      inputContribution,
      customContribution,
      useSuggestedContribution,
      useCustomContribution
    } = this.state;
    const { classes } = this.props;
    const selectedClasses = `${classes.selectedContribution} ${
      classes.contributionChip
    }`;
    const unselectedClasses = `${classes.unselectedContribution} ${
      classes.contributionChip
    }`;

    return (
      <div>
        <div className={classes.contributionChipFrame}>
          {contributionSuggestions.map(amount => {
            return (
              <div
                className={
                  useSuggestedContribution && contribution === amount.value
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
              FormatCurrency(customContribution)
            ) : (
              "Other Amount"
            )}
          </div>
        </div>
        {this.state.contribution && (
          <CheckoutMath subtotal={this.state.contribution} />
        )}
      </div>
    );
  }
}

ContributionCheckout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContributionCheckout);
