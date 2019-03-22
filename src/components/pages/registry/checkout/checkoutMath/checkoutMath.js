import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";
import FormatCurrency from "../../formatCurrency/formatCurrency";

const styles = theme => ({
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

const CheckoutMath = props => {
  const { subtotal, classes } = props;
  if (!subtotal) return <div />;
  //   if (!subtotal || (!useCustomContribution && !useSuggestedContribution))
  //     return null;
  const processingFee = subtotal * 0.029 + 0.3;
  return (
    <div className={classes.checkoutFrame}>
      <div className={classes.checkoutLine}>
        Subtotal{" "}
        <span className={classes.checkoutPrice}>
          {FormatCurrency(subtotal, false)}
        </span>
      </div>
      <div className={classes.checkoutLine}>
        <span className={classes.processingFee}>Processing Fee</span>
        <Icon
          className={classNames(classes.disclaimer, "fas fa-question-circle")}
          color="secondary"
        />{" "}
        <span className={classes.checkoutPrice}>
          {FormatCurrency(processingFee, false)}
        </span>
      </div>
      <div className={classes.totalLine}>
        <span>Grand Total</span>{" "}
        <span className={classes.checkoutPrice}>
          {FormatCurrency(+processingFee + +subtotal, false)}
        </span>
      </div>
    </div>
  );
};

CheckoutMath.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckoutMath);
