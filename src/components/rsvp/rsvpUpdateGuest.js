import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

import "./rsvpUpdateGuest.css";


class RsvpUpdateGuest extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.declineRsvp = this.declineRsvp.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.submitRsvp = this.submitRsvp.bind(this);
  }

  componentDidMount() {
    const comments = this.props.guest ? this.props.guest.comments : null;
    this.setState({
      comments,
      hotelAssistance: false
    });
  }

  handleCommentUpdate(e) {
    this.setState({
      comments: e.target.value
    });
  }

  declineRsvp() {
    if (!(this.props && this.props.guest)) return;
    const { id, firstName, lastName } = this.props.guest;
    this.props.submitRsvp({id, firstName, lastName, isAttending:false});
    this.props.exitUpdate();
  }

  submitRsvp() {
    if (!(this.props && this.props.guest)) return;
    const { id, firstName, lastName } = this.props.guest;
    const { comments } = this.state;
    this.props.submitRsvp({id, firstName, lastName, isAttending:true, comments});
    this.props.exitUpdate();
  }

  render() {
    if (!(this.props && this.props.guest)) return <div/>;
    const { guest } = this.props;
    const { firstName, lastName, isAttending } = this.props.guest;
    const { comments } = this.state;


    return (
      <div>
        <div className="full-name">{`${firstName} ${lastName}`}</div>

        <div className={"form-description"}>
          Please let us know if you have any food allergies or dietary
          restrictions. {comments}
        </div>
        <form>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            fullWidth
            autoFocus
            value={comments}
            label="Dietary Restrictions"
            onChange={this.handleCommentUpdate}
            margin="normal"
            variant="outlined"
          />
        </form>
        <DialogActions>
        <Button color="default" onClick={this.props.exitUpdate}>
                Cancel
              </Button>

          {isAttending && (
            <div>
              <Button color="secondary" onClick={this.declineRsvp}>
                I Can't Make It
              </Button>
              <Button
                onClick={this.submitRsvp}
                variant="contained"
                color="primary"
                disabled={comments === guest.comments}
              >
                Update Restrictions
              </Button>
            </div>
          )}
          {!isAttending && (
            <Button
              onClick={this.submitRsvp}
              variant="contained"
              color="primary"
            >
              I'm Going
            </Button>
          )}
        </DialogActions>
      </div>
    );
  }
}

RsvpUpdateGuest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RsvpUpdateGuest;
