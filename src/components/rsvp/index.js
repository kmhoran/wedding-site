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
import { observer, inject } from "mobx-react";
// import { reaction } from "mobx";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

import RsvpAddName from "./rsvpAddName";
import RsvpUpdateRsvp from "./rsvpUpdateRsvp";

import "./index.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const RsvpDialogView = inject("rsvpStore")(
  observer(
    class RsvpDialog extends React.Component {
      state = {
        open: false,
        addingRsvp: false,
        updatingRsvp: false,
        highlightedRsvp: null
      };
      constructor(props) {
        super(props);
        this.handleRsvpSubmit = this.handleRsvpSubmit.bind(this);
        this.returnToMain = this.returnToMain.bind(this);
      }

      componentDidMount() {
        // this.props.rsvpStore.activate();
      }

      handleClickOpen = () => {
        const { rsvpStore } = this.props;
        this.setState({
          open: true,
          addingRsvp: rsvpStore.rsvps.length === 0,
          updatingRsvp: false,
          highlightedRsvp: null
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
          addingRsvp: true,
          updatingRsvp: false,
          highlightedRsvp: null
        });
      };

      handleRsvpSubmit = rsvpObject => {
        const { rsvpStore } = this.props;
        rsvpStore.saveRsvp(rsvpObject);
      };

      enterAddNameFlow = () => {
        this.setState({
          addingRsvp: true,
          updatingRsvp: false,
          highlightedRsvp: null
        });
      };

      returnToMain = () => {
        this.setState({
          addingRsvp: false,
          updatingRsvp: false,
          highlightedRsvp: null
        });
      };

      exitFlows = () => {
        this.setState({
          addingRsvp: false,
          updatingRsvp: false,
          highlightedRsvp: null
        });
      };

      enterUpdateRsvpFlow = id => {
        const highlightedRsvp = this.props.rsvpStore.rsvps.filter(g => {
          return g.id === id;
        })[0];
        this.setState({
          addingRsvp: false,
          updatingRsvp: true,
          highlightedRsvp
        });
      };

      render() {
        const { fullScreen, children, rsvpStore } = this.props;
        const { addingRsvp, updatingRsvp, highlightedRsvp } = this.state;
        if (!rsvpStore) return <div>Loading..</div>;

        const content = () => {
          return (
            <div>
              <div className={"rsvp-collection"}>
                {rsvpStore.rsvps.map(rsvp => (
                  <div
                    key={rsvp.id}
                    className={"rsvp-tile"}
                    onClick={() => {
                      this.enterUpdateRsvpFlow(rsvp.id);
                    }}
                  >
                    <div className={"rsvp-name"}>{`${rsvp.firstName} ${
                      rsvp.lastName
                    }`}</div>
                    <div>
                      <div
                        className={classNames(
                          "rsvp-attending",
                          "icon-line",
                          rsvp.isAttending ? "accept" : "reject"
                        )}
                      >
                        <div className={"rsvp-attending-icon icon"}>
                          <Icon
                            className={classNames(
                              rsvp.isAttending ? "fas fa-check" : "fas fa-times"
                            )}
                          />
                        </div>
                        <div className={"rsvp-attending-text"}>
                          {rsvp.isAttending ? "Attending" : "Not Attending"}
                        </div>
                      </div>
                    </div>
                    {rsvp.isAttending && rsvp.comments && (
                      <div>
                        <div className={classNames("icon-line", "rsvp-meal")}>
                          <div className={"rsvp-meal-icon icon"}>
                            <Icon
                              className={classNames("fas fa-drumstick-bite")}
                            />
                          </div>
                          <div className={"rsvp-meal-name"}>
                            {rsvp.comments}
                          </div>
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
                  Add Another Rsvp
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
              fullWidth={true}
              open={this.state.open}
              TransitionComponent={Transition}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
              onBackdropClick={this.closeDialog}
              PaperProps={{
                className: "the-paper"
              }}
            >
              <div className={"ex-bar"}>
                <Button onClick={this.closeDialog}>
                  <Icon className={classNames("fas fa-times")} />
                </Button>
              </div>
              <DialogTitle id="responsive-dialog-title">
                {rsvpStore.rsvps.length === 0 || addingRsvp
                  ? "Thank you for your RSVP"
                  : "Let us know if your plans have changed."}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {rsvpStore.rsvps.length === 0 || addingRsvp ? (
                    <RsvpAddName
                      submitRsvp={this.handleRsvpSubmit}
                      returnToMain={this.returnToMain}
                    />
                  ) : rsvpStore.rsvps.length > 0 &&
                    updatingRsvp &&
                    highlightedRsvp ? (
                    <RsvpUpdateRsvp
                      rsvp={highlightedRsvp}
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
