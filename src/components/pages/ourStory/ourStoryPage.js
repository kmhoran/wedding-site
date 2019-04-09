import React from "react";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Hero from "../../hero";
import ViewCell from "../viewCell";
import Footer from "../footer";
import photos from "../../../constants/photos";
import PhotoBar from "../photos/photoBar";

import { Parallax, Background } from "react-parallax";

import "./ourStoryPage.css";

const storyContent = `Lorem ipsum dolor sit amet, sed movet altera te, qui officiis quaerendum te, ei nibh duis mei. His no quando consequuntur, est ipsum mundi eu. Hinc vero usu ei, eius nusquam erroribus nec no, eos labitur sententiae adversarium in. Case cibo impetus mel id, et eum postea repudiare.

Quas periculis ut est. Meis admodum explicari eam eu, veniam consequuntur eam ei. Eu vim omnis munere, soluta hendrerit democritum mel id. An ridens causae cetero his, no duis invenire nec, pro ex duis solum. Deleniti perpetua vim at, debet ubique omittantur at vim.`;

const shortContent = `Lorem ipsum dolor sit amet, sed movet altera te, qui officiis quaerendum te, ei nibh duis mei. His no quando consequuntur, est ipsum mundi eu.`;

const StoryPane = props => {
  const { color, centered } = props;
  const style = getStyling(color, centered);

  return (
    <div className={"story-pane"} style={style}>
      <div className={"story-pane-title"}>{props.title}</div>
      <div className={"story-pane-content"}>{props.children}</div>
    </div>
  );
};

const getStyling = (color, centered) => {
  const styles = {};
  if (color && color.toLowerCase() == "red") {
    styles.backgroundColor = "#960709";
    styles.color = "#fff";
  }
  if (centered) styles.textAlign = "center";
  return styles;
};

class OurStoryPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <MobileBar />
        <WebBar />
        <Hero
          imageSrc={photos.chenonceauxHero}
          text="Once upon a time in France..."
          height="100vh"
        />
        <div className={"split-pane"}>
          <StoryPane title={"Our Story"}>
            <div className={"centered-content"}>{storyContent}</div>
          </StoryPane>
          <div className={"paralax-cell"}>
            <Parallax
              blur={0}
              bgImage={photos.ourStoryMain}
              bgImageAlt="in the Tuileries"
              strength={250}
            >
              <div className={"filler"} />
            </Parallax>
          </div>
        </div>

        <StoryPane title={"Valenciennes"} color={"red"} centered>
          <div className={"centered-content"}>{storyContent}</div>
        </StoryPane>
        <StoryPane title={"Home on the West Coast"}>{shortContent}</StoryPane>
        <PhotoBar />
        <Footer />
      </div>
    );
  }
}

export default OurStoryPage;
