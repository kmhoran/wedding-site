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

import "./galleryDialog.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const GalleryDialogView = inject("windowStore")(
  observer(
    class GalleryDialog extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          open: false
        };
      }
      componentDidMount() {}

      handleClickOpen = () => {
        if (this.props.onOpen) this.props.onOpen();
        this.setState({
          open: true
        });
      };

      handleClickNext = () => {
        this.props.getNext();
      };

      handleClickPrev = () => {
        this.props.getPrev();
      };

      closeDialog = () => {
        this.setState({ open: false });
        if (this.props.onClose) {
          this.props.onClose();
        }
      };
      render() {
        if (!this.props || !this.props.photo) return <div />;
        const { children, getNext, getPrev, photo, windowStore } = this.props;
        const paperStyle = windowStore.isMobile
          ? {}
          : { height: "70vh", maxHeight: "700px" };
        const imageStyle =
          windowStore.isMobile && windowStore.isPortrait
            ? {
                minHeight: "auto",
                height: "auto",
                width: "100%"
              }
            : {};
        return (
          <div>
            <div className={"trigger"} onClick={this.handleClickOpen}>
              {children}
            </div>
            <Dialog
              className={"modal-dialog"}
              fullScreen={windowStore.isMobile}
              fullWidth={true}
              maxWidth={"lg"}
              open={this.state.open}
              TransitionComponent={Transition}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
              onBackdropClick={this.closeDialog}
              PaperProps={{
                className: "the-paper",
                style: paperStyle
              }}
            >
              <div>
                <Button onClick={this.closeDialog}>
                  <Icon className={classNames("fas fa-times")} />
                </Button>
              </div>
              {!windowStore.isMobile && (
                <div className={"photo-dialog-title"}>{photo.label}</div>
              )}

              <DialogContent className={"photo-dialog-content"}>
                {!(windowStore.isPortrait && windowStore.isMobile) && (
                  <div
                    className={"direction-arrow"}
                    onClick={this.handleClickPrev}
                  >
                    <Icon className={"icon fas fa-chevron-left"} />
                  </div>
                )}

                <div className={"image-frame"} style={imageStyle}>
                  <img
                    className={"dialog-image"}
                    src={photo.image}
                    style={imageStyle}
                  />
                </div>
                {!(windowStore.isPortrait && windowStore.isMobile) && (
                  <div
                    className={"direction-arrow"}
                    onClick={this.handleClickNext}
                  >
                    <Icon className={"icon fas fa-chevron-right"} />
                  </div>
                )}
              </DialogContent>
              <div className="mobile-portrait-actions">
                <div
                  className={"direction-arrow"}
                  onClick={this.handleClickPrev}
                >
                  <Icon className={"icon fas fa-chevron-left"} />
                </div>
                <div
                  className={"direction-arrow"}
                  onClick={this.handleClickNext}
                >
                  <Icon className={"icon fas fa-chevron-right"} />
                </div>
              </div>
            </Dialog>
          </div>
        );
      }
    }
  )
);

GalleryDialogView.propTypes = {
  photo: PropTypes.object.isRequired,
  getNext: PropTypes.func.isRequired,
  getPrev: PropTypes.func.isRequired
};

export default withMobileDialog()(GalleryDialogView);
