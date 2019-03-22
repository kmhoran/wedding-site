import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegistryProgress from "../registryProgress/registryProgress";
import HoneymoonLogo from "../honeymoonLogo/honeymoonLogo";
import routes from "../../../../constants/routes";

const styles = {
  cardLink: {
    textDecoration: "none !important"
  },
  card: {
    minWidth: 275,
    maxWidth: 275,
    flexGrow: 1,
    margin: "0.5em",
    textAlign: "center"
  },
  honeymoon: {
    backgroundColor: "rgb(255, 200, 232)"
  },
  imageFrame: {
    height: "20em",
    overflow: "hidden"
  },
  image: {
    height: "100%",
    cursor: "pointer"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  storeLogo: {
    marginTop: "5px"
  },
  itemName: {
    margin: "10px 0",
    fontSize: "0.9em",
    color: "#333"
  },
  price: {
    margin: "5px 0",
    fontWeight: 700
  },
  countDesired: {
    margin: "10px 0",
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "center"
  },
  countDesiredText: {
    margin: "0 10px"
  },
  fundraiser: {
    margin: "10px 0",
    textTransform: "uppercase",
    wordSpacing: "7px"
  },
  red: {
    color: "red",
    fontWeight: 700
  },
  cardActions: {
    justifyContent: "center",
    marginBotton: "0.5em"
  }
};

function RegistryCard(props) {
  const { classes, item } = props;
  const bull = <span className={classes.bullet}>•</span>;

  const cardClass = `${classes.card}`.concat(
    item.honeymoon ? ` ${classes.honeymoon}` : ""
  );

  return (
    <Link className={classes.cardLink} to={routes.Registry + "/" + item.id}>
      <Card className={cardClass}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {item.categoty}
          </Typography>
          <div className={classes.imageFrame}>
            {/* <Link to={routes.Registry + "/" + item.id}> */}
            <img className={classes.image} src={item.image} />
            {/* </Link> */}
          </div>
          {item.honeymoon && <HoneymoonLogo />}
          {item.store && (
            <img className={classes.storeLogo} src={item.store.image} />
          )}
          <Typography className={classes.itemName} variant="p" component="p">
            {item.name}
          </Typography>

          {item.price && (
            <Typography color="secondary" className={classes.price}>
              $ {item.price}
            </Typography>
          )}
          <RegistryProgress item={item} />
        </CardContent>
        <CardActions className={classes.cardActions}>
          {/* <Link to={routes.Registry + "/" + item.id}> */}
          <Button
            size="small"
            color={item.active ? "primary" : "default"}
            variant="contained"
            disabled={!item.active}
          >
            {item.active
              ? item.purchaseOutright
                ? "View"
                : "Contribute Any Amount"
              : "Purchased"}
          </Button>
          {/* </Link> */}
        </CardActions>
      </Card>
    </Link>
  );
}

RegistryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(RegistryCard);
