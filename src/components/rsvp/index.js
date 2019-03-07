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
import { reaction } from "mobx";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

import RsvpAddName from "./rsvpAddName";
import RsvpUpdateGuest from "./rsvpUpdateGuest";

import "./index.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const RsvpDialogView = inject("rsvpStore")(
  observer(
    class RsvpDialog extends React.Component {
      state = {
        open: false,
        addingGuest: false,
        updatingGuest: false,
        highlightedGuest: null
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
          addingGuest: rsvpStore.guests.length == 0,
          updatingGuest: false,
          highlightedGuest: null
        });
      };

      closeDialog = () => {
        this.setState({ open: false });
        if (this.props.onClose) {
          this.props.onClose();
        }
      };

      enterNameAddSteps = () => {
        this.setState({
          addingGuest: true,
          updatingGuest: false,
          highlightedGuest: null
        });
      };

      handleRsvpSubmit = (guestObject) => {
        const { rsvpStore } = this.props;
        rsvpStore.saveGuest(guestObject);
      };

      enterAddNameFlow = () => {
        this.setState({
          addingGuest: true,
          updatingGuest: false,
          highlightedGuest: null
        });
      };

      returnToMain = () => {
        this.setState({
          addingGuest: false,
          updatingGuest: false,
          highlightedGuest: null
        });
      };

      exitFlows = () => {
        this.setState({
          addingGuest: false,
          updatingGuest: false,
          highlightedGuest: null
        });
      }

      enterUpdateGuestFlow = id => {
        const highlightedGuest = this.props.rsvpStore.guests.filter(g => {
          return g.id === id;
        })[0];
        this.setState({
          addingGuest: false,
          updatingGuest: true,
          highlightedGuest
        });
      };

      render() {
        const { fullScreen, children, rsvpStore } = this.props;
        const { addingGuest, updatingGuest, highlightedGuest } = this.state;
        if (!rsvpStore) return <div>Loading..</div>;

        const content = () => {
          return (
            <div>
              <div className={"guest-collection"}>
                {rsvpStore.guests.map(guest => (
                  <div 
                      key={guest.id} 
                      className={"guest-tile"}
                      onClick={() => {this.enterUpdateGuestFlow(guest.id)}}>
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
                    {guest.isAttending && guest.comments && (
                      <div>
                        <div
                          className={classNames(
                            "icon-line",
                            "guest-meal")}
                        >
                          <div className={"guest-meal-icon icon"}>
                            <Icon className={classNames("fas fa-drumstick-bite")} />
                          </div>
                          <div className={"guest-meal-name"}>{guest.comments}</div>
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
                  color="primary"
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
            <div className={"trigger"} onClick={this.handleClickOpen}>
              {children}
            </div>
            <Dialog
              className={"modal-dialog"}
              fullScreen={fullScreen}
              fullWidth="lg"
              open={this.state.open}
              TransitionComponent={Transition}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
              onBackdropClick={this.closeDialog}
              PaperProps={{
                className: "the-paper"
              }}
            >
              <div>
                <Button onClick={this.closeDialog}>
                  <Icon className={classNames("fas fa-times")} />
                </Button>
              </div>
              <DialogTitle id="responsive-dialog-title">
                {rsvpStore.guests.length == 0 || addingGuest
                  ? "Thank you for your RSVP"
                  : "Let us know if your plans have changed."}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {rsvpStore.guests.length == 0 || addingGuest ? (
                    <RsvpAddName
                      submitRsvp={this.handleRsvpSubmit}
                      returnToMain={this.returnToMain}
                    />
                  ) : rsvpStore.guests.length > 0 &&
                    updatingGuest &&
                    highlightedGuest ? (
                    <RsvpUpdateGuest
                      guest={highlightedGuest}
                      submitRsvp={this.handleRsvpSubmit}
                      exitUpdate={this.exitFlows}
                    />
                  ) : (
                    content()
                  )}
                </DialogContentText>
              </DialogContent>
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
