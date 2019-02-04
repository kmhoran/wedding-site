import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import routes from "../../../constants/routes";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 275,
    flexGrow: 1,
    margin: "0.5em",
    textAlign: "center"
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
  price: {
    margin: "5px 0",
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

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {item.categoty}
        </Typography>
        <div className={classes.imageFrame}>
          <Link to={routes.Registry + "/" + item.id}>
            <img className={classes.image} src={item.image} />
          </Link>
        </div>
        <Typography component="p">{item.type}</Typography>
        <Typography variant="h6" component="h6">
          {item.name}
        </Typography>

        {item.price && (
          <Typography color="secondary" className={classes.price}>
            $ {item.price}
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link to={routes.Registry + "/" + item.id}>
          <Button
            size="small"
            color={item.active ? "primary" : "default"}
            variant="contained"
            disabled={!item.active}
          >
            {item.active
              ? item.purchaseOutright
                ? "View"
                : "Contribute"
              : "Purchased"}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

RegistryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(RegistryCard);
