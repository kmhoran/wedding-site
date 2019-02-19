import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Slide from "@material-ui/core/Slide";
import { observer, inject, Provider } from "mobx-react";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

import RsvpAddName from "./rsvpAddName";

import "./index.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const RsvpDialogView = inject("rsvpStore")(
  observer(
    class RsvpDialog extends React.Component {
      state = {
        open: false,
        addingGuest: false
      };
      constructor(props) {
        super(props);
        this.handleRsvpSubmit = this.handleRsvpSubmit.bind(this);
        this.returnToMain = this.returnToMain.bind(this);
      }

      componentDidMount() {
        this.props.rsvpStore.activate();
      }

      handleClickOpen = () => {
        const { rsvpStore } = this.props;
        this.setState({
          open: true,
          addingGuest: rsvpStore.guests.length == 0
        });
      };

      closeDialog = () => {
        this.setState({ open: false });
        if (this.props.onClose) {
          this.props.onClose();
        }
      };

      handleClickNotAttending = () => {
        const { rsvpStore } = this.props;
        rsvpStore.addGuest("some", "name", false, 1);
        this.closeDialog();
      };

      handleClickAttending = () => {
        const { rsvpStore } = this.props;
        rsvpStore.addGuest("some", "name", true, 1);
        this.closeDialog();
      };

      handleRsvpSubmit = (
        firstName,
        lastName,
        isAttending,
        meal = null
      ) => {
        const { rsvpStore } = this.props;
        rsvpStore.addGuest(
          firstName,
          lastName,
          isAttending,
          meal
        );
      };

      enterAddNameFlow = () => {
        this.setState({
          addingGuest: true
        });
      };

      returnToMain = () => {
        this.setState({
          addingGuest: false
        });
      };

      render() {
        const { fullScreen, children, rsvpStore } = this.props;
        const { addingGuest } = this.state;
        if (!rsvpStore) return <div>Loading..</div>;

        const content = () => {
          return (
            <div>
              <div className={"guest-collection"}>
                {rsvpStore.guests.map(guest => (
                  <div key={guest.id} className={"guest-tile"}>
                    <div className={"guest-name"}>{`${guest.firstName} ${
                      guest.lastName
                    }`}</div>
                    <div>
                      <div
                        className={classNames(
                          "guest-attending",
                          "icon-line",
                          guest.isAttending ? "accept" : "reject"
                        )}
                      >
                        <div className={"guest-attending-icon icon"}>
                          <Icon
                            className={classNames(
                              guest.isAttending
                                ? "fas fa-check"
                                : "fas fa-times"
                            )}
                          />
                        </div>
                        <div className={"guest-attending-text"}>
                          {guest.isAttending ? "Attending" : "Not Attending"}
                        </div>
                      </div>
                    </div>
                    {guest.isAttending && (
                      <div>
                        <div
                          className={classNames(
                            "icon-line",
                            "guest-meal",
                            guest.meal === "vegetarian" ? "veg" : ""
                          )}
                        >
                          <div className={"guest-meal-icon icon"}>
                            <Icon className={classNames("fas fa-utensils")} />
                          </div>
                          <div className={"guest-meal-name"}>{guest.meal}</div>
                        </div>
                      </div>
                    )}

                    <br />
                  </div>
                ))}
              </div>
              <DialogActions>
                <Button onClick={this.closeDialog}>Close</Button>
                <Button
                  onClick={this.enterAddNameFlow}
                  variant="contained"
                  color="secondary"
                  autoFocus
                >
                  Add Another Guest
                </Button>
              </DialogActions>
            </div>
          );
        };
        return (
          <div>
            <div onClick={this.handleClickOpen}>{children}</div>
            <Dialog
              fullScreen={fullScreen}
              fullWidth="lg"
              open={this.state.open}
              TransitionComponent={Transition}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <div>
                <Button onClick={this.closeDialog}>
                  <Icon className={classNames("fas fa-times")} />
                </Button>
              </div>
              <DialogTitle id="responsive-dialog-title">
                {rsvpStore.hasRsvp
                  ? "Let us know if your plans have changed."
                  : "Will we see you there?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {rsvpStore.guests.length == 0 || addingGuest ? (
                    <RsvpAddName
                      submitRsvp={this.handleRsvpSubmit}
                      returnToMain={this.returnToMain}
                    />
                  ) : (
                    content()
                  )}
                </DialogContentText>
              </DialogContent>
              {/* <DialogActions>
              <Button
                  onClick={this.handleClickAttending}
                  color="psecondary"
                  autoFocus
                >
                  I'm Going
                </Button>
                <Button
                  onClick={this.handleClickNotAttending}
                  color="psecondary"
                  autoFocus
                >
                  I Can't Make It
                </Button>
              </DialogActions> */}
            </Dialog>
          </div>
        );
      }
    }
  )
);

RsvpDialogView.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(RsvpDialogView);
