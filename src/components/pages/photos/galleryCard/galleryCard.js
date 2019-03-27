import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
  }
};

function GalleryCard(props) {
  const { classes, photo } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.imageFrame}>
          <img className={classes.image} src={photo.image} />
        </div>
      </CardContent>
    </Card>
  );
}

GalleryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired
};

export default withStyles(styles)(GalleryCard);
