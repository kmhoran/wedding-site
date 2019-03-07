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

import "./rsvpAddName.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class RsvpAddName extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
    this.declineRsvp = this.declineRsvp.bind(this);
    this.handleCommentAdditions = this.handleCommentAdditions.bind(this);
    this.submitRsvp = this.submitRsvp.bind(this);
    this.decrementStep = this.decrementStep.bind(this);
  }

  componentDidMount() {
    this.setState({
      step: 1,
      firstName: null,
      firstNameTouched: false,
      lastName: null,
      lastNameTouched: false,
      comments: null,
      meal: null,
      hotelAssistance: false
    });
  }

  handleFirstNameChange(e) {
    this.setState({
      firstName: e.target.value,
      firstNameTouched: true
    });
  }

  handleLastNameChange(e) {
    this.setState({
      lastName: e.target.value,
      lastNameTouched: true
    });
  }
  handleCommentAdditions(e) {
    this.setState({
      comments: e.target.value
    });
  }
  // handleMealSelect(e) {
  //   this.setState({
  //     meal: e.target.value
  //   });
  // }

  // handleHotelSelect(e) {
  //   this.setState({
  //     hotelAssistance: e.target.checked
  //   });
  // }

  incrementStep() {
    if (this.state.step <= 3) {
      this.setState(prevState => ({
        step: prevState.step + 1
      }));
    }
  }

  decrementStep() {
    if (this.state.step > 1) {
      this.setState(prevState => ({
        step: prevState.step - 1
      }));
    }
  }

  declineRsvp() {
    const { firstName, lastName } = this.state;
    this.props.submitRsvp({firstName, lastName, isAttending:false});
    this.props.returnToMain();
  }

  submitRsvp() {
    const { firstName, lastName, comments } = this.state;
    this.props.submitRsvp({firstName, lastName, isAttending:true, comments});
    this.props.returnToMain();
  }

  render() {
    const { classes } = this.props;
    const {
      step,
      firstName,
      firstNameTouched,
      lastName,
      lastNameTouched
    } = this.state;

    const enterName = () => (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            required
            error={!firstName && firstNameTouched}
            id="first-name"
            label="First Name"
            className={classes.textField}
            value={firstName}
            onChange={this.handleFirstNameChange}
            margin="normal"
          />
          <TextField
            required
            error={!lastName && lastNameTouched}
            id="last-name"
            label="Last Name"
            className={classes.textField}
            value={lastName}
            onChange={this.handleLastNameChange}
            margin="normal"
          />
        </form>
        <br />
        <div className="action-button">
          <Button
            variant="contained"
            color="primary"
            onClick={this.incrementStep}
            disabled={!firstName || !lastName}
          >
            Next {"\u00A0"}
            <span className="fas fa-arrow-right" />
          </Button>
        </div>
      </div>
    );

    const chooseRsvp = () => (
      <div>
        <div className="full-name">{`${firstName} ${lastName}`}</div>
        <br />
        <DialogActions>
          <Button onClick={this.declineRsvp} autoFocus>
            I Can't Make It
          </Button>
          <Button
            onClick={this.incrementStep}
            variant="contained"
            color="primary"
            autoFocus
          >
            I'm Going
          </Button>
        </DialogActions>
      </div>
    );

    const renderContent = () => {
      switch (step) {
        case 1:
          return enterName();
        case 2:
          return chooseRsvp();
        case 3:
          return this.choosePreferences(this.props);
        default:
          return <h1>End of Index</h1>;
      }
    };

    return <div>{renderContent()}</div>;
  }

  choosePreferences = props => {
    const { classes } = props;
    const { firstName, lastName, restrictions } = this.state;
    return (
      <div>
        <div className="full-name">{`${firstName} ${lastName}`}</div>
        {/* <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          Select Your Meal
        </FormLabel>
        <RadioGroup
          aria-label="Meal Select"
          name="mealSelect"
          className={classes.group}
          value={this.state.value}
          onChange={this.handleMealSelect}
        >
          <FormControlLabel value="beef" control={<Radio />} label="Beef" />
          <FormControlLabel value="chicken" control={<Radio />} label="Chicken" />
          <FormControlLabel
            value="vegetarian"
            control={<Radio />}
            label="Vegetarian"
          />
        </RadioGroup>
        <div className="meal-question">
        <FormControlLabel
          control={<Checkbox onChange={this.handleHotelSelect} />}
          label="Will you need assistance finding a hotel?"
          labelPlacement="start"
        />
        </div>
      </FormControl> */}
      <div className={'form-description'}>Please let us know if you have any food allergies or dietary restrictions.</div>
        <form>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            fullWidth
            label="Dietary Restrictions"
            onChange={this.handleCommentAdditions}
            margin="normal"
            variant="outlined"
          />
        </form>
        <DialogActions>
          <p onClick={this.decrementStep}>Back</p>
          <Button
            onClick={this.submitRsvp}
            variant="contained"
            color="primary"
            autoFocus
          >
            {this.state.comments? 'Submit': 'No Restrictions'}
          </Button>
        </DialogActions>
      </div>
    );
  };
}

RsvpAddName.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RsvpAddName);
