import React from "react";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Footer from "../footer";
// import { gallarySet } from "../../../constants/photos";

//import { Carousel } from "react-responsive-carousel";
// import Carousel from "./carousel/carousel";
import { observer, inject, Provider } from "mobx-react";
import GalleryCard from "./galleryCard/galleryCard";
import GalleryDialog from "./galleryCard/galleryDialog";
import "./photoPage.css";

const PhotoPageView = inject("galleryStore", "windowStore")(
  observer(
    class PhotoCarousel extends React.Component {
      constructor(props) {
        super(props);
      }
      componentDidMount() {
        window.scrollTo(0, 0);
      }

      render() {
        const { galleryStore, windowStore } = this.props;
        if (!galleryStore.loaded) return <div />;
        return (
          <div className="photo-page-frame">
            <MobileBar />
            <WebBar />
            <div className={"gallery-cards"}>
              {galleryStore.galleryImages.map((photo, index) => (
                <GalleryDialog
                  key={index}
                  photo={galleryStore.selectedImage}
                  fullScreen={windowStore.isMobile}
                  onOpen={() => {
                    galleryStore.setImage(photo.id);
                  }}
                  getNext={galleryStore.stepRight}
                  getPrev={galleryStore.stepLeft}
                >
                  <GalleryCard photo={photo} />
                </GalleryDialog>
              ))}
            </div>
            <Footer />
          </div>
        );
      }
    }
  )
);
export default PhotoPageView;
