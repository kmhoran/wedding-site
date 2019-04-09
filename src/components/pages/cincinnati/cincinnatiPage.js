import React from "react";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Hero from "../../hero";
import ViewCell from "../viewCell";
import Footer from "../footer";
import photos from "../../../constants/photos";
import { Parallax, Background } from "react-parallax";
import IntersectionVisible from "react-intersection-visible";

import { breweries } from "./breweries";

import "./cincinnatiPage.css";

const ContentPane = props => {
  return (
    <div className={"content-pane"}>
      <div className={"content-pane-cell"}>stuff</div>
      <div className={"content-pane-cell"}>stuff</div>
    </div>
  );
};

class CincinnatiPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brewVisibility: {} };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      ...breweries.reduce((final, brew) => {
        if (brew.id) final[brew.id] = false;
        return final;
      }, {})
    });
  }
  onShow(id) {
    console.log("saw id: ", id);
    this.setState({ [id]: true });
  }

  render() {
    const opts = {
      height: "415",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        loop: 1,
        modestbranding: 1
      }
    };
    const { brewVisibility } = this.state;

    return (
      <div>
        <MobileBar />
        <WebBar />
        <Hero
          imageSrc={photos.cincyHero}
          text="Cincinnati: the Queen City"
          height="100vh"
        />

        <div className={"intro"}>
          <div className={"cincy-content-cell cell-text"}>
            <div className={"cincy-content-title"}>Welcome to Cincinnati</div>

            <div className={"cincy-content-paragraph"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis ut dui vel dictum. Nam mattis justo metus, sed
              scelerisque quam semper sit amet. Curabitur diam sapien,
              vestibulum ac accumsan et, dignissim non risus. Morbi sit amet
              iaculis sapien. Aenean nibh elit, mollis elementum efficitur id,
              fringilla et urna. Curabitur placerat quis mauris eu aliquet. Sed
              molestie nisi id arcu dignissim rhoncus. Praesent mollis lobortis
              sem a scelerisque. Fusce lobortis semper risus sed pharetra. Morbi
              ut faucibus urna. Phasellus porta eros id congue rutrum. Fusce
              porta leo vitae lectus vulputate, sed aliquet enim iaculis. Sed
              fermentum pretium mi, eget placerat quam condimentum a. Quisque et
              nibh ante. Suspendisse potenti.
            </div>
          </div>
        </div>
        {/* 
        <div className={"video-pane"}>
        <video autoPlay loop muted>
            <source
              src="https://drive.google.com/file/d/16V_RCLfFysohNqtk7Nf2EtA4NYZMkokN/"
              type="video/mp4"
            />
            Your browser does not support HTML5 video.
          </video>
          <div className={"quote-cell"}>
            <div className={"quote"}>
              <p>And this Song of the Vine,</p>
              <p>This greeting of mine,</p>
              <p>The winds and</p>
              <p>the birds shall deliver,</p>
              <p>To the Queen of the West, In her garlands</p>
              <p>dressed, On the banks of the Beautiful River.</p>
            </div>
            <div className={"attribution"}>— Henry Wadsworth Longfellow</div>
          </div>
        </div> */}

        <div className={"where-to-stay"}>
          <div className={"cincy-content-pane"}>
            <div className={"cincy-content-cell cell-image"}>
              <div className={"cincy-content-image-frame"}>
                <Parallax
                  blur={0}
                  bgImage={photos.fountainSquare}
                  bgImageAlt="fountain square"
                  strength={250}
                >
                  <div className={"filler"} />
                </Parallax>
              </div>
            </div>
            <div className={"cincy-content-cell cell-text"}>
              <div className={"cincy-content-title"}>Places to Stay</div>
              <div className={"cincycontent-cell-subtitle"}>
                Book a Hotel Downtown
              </div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis ut dui vel dictum.
              <div className={"cincy-content-cell-line"}>
                <i className={"fas fa-map-marker-alt"} />
                <a className={"cincy-content-cell-acion-link"} href={"#"}>
                  Where We'll Be Staying
                </a>
              </div>
              <div className={"cincy-content-cell-line"}>
                <i className={"fas fa-hotel"} />
                <a className={"cincy-content-cell-acion-link"} href={"#"}>
                  Other Hotels Near Downtown.
                </a>
              </div>
              <div className={"cincycontent-cell-subtitle"}>
                Book a Private Residence
              </div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis ut dui vel dictum.
              <div className={"cincy-content-cell-line"}>
                <i className={"fab fa-airbnb"} />
                <a className={"cincy-content-cell-acion-link"} href={"#"}>
                  Search Airbnb
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={"stuff-to-do"}>
          <div className={"cincy-content-pane"}>
            <div className={"cincy-content-cell cell-text"}>
              <div className={"cincy-content-title"}>See the Sights</div>
              <div className={"cincycontent-cell-subtitle"}>
                Downtown Activities
              </div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis ut dui vel dictum.
              <div className={"cincy-content-cell-line"}>
                <i className={"fas fa-bowling-ball"} />
                <a className={"cincy-content-cell-acion-link"} href={"#"}>
                  Morbi sit amet iaculis sapien.
                </a>
              </div>
              <div className={"cincy-content-cell-line"}>
                <i className={"fas fa-glass-martini-alt"} />
                <a className={"cincy-content-cell-acion-link"} href={"#"}>
                  Morbi sit amet iaculis sapien.
                </a>
              </div>
              <div className={"cincycontent-cell-subtitle"}>
                Around Cincinnati
              </div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis ut dui vel dictum.
              <div className={"cincy-content-cell-line"}>
                <i className={"fas fa-hippo"} />
                <a className={"cincy-content-cell-acion-link"} href={"#"}>
                  Morbi sit amet iaculis sapien.
                </a>
              </div>
              <div className={"cincy-content-cell-line"}>
                <i className={"fas fa-ship"} />
                <a className={"cincy-content-cell-acion-link"} href={"#"}>
                  Morbi sit amet iaculis sapien.
                </a>
              </div>
            </div>
            <div className={"cincy-content-cell cell-image"}>
              <div className={"cincy-content-image-frame"}>
                <Parallax
                  blur={0}
                  bgImage={
                    "https://upload.wikimedia.org/wikipedia/commons/8/83/Belle_of_Cincinnati_2008.jpg"
                  }
                  bgImageAlt="fountain square"
                  strength={250}
                >
                  <div className={"filler"} />
                </Parallax>
              </div>
            </div>
          </div>
          {/* <h1>What to do</h1>
          <ul>
            <li>Zoo - Harambe/ Fiona</li>
            <li>Museums</li>
            <li>taft museum</li>
            <li>
              River boat cruise
              https://bbriverboats.com/cruises/historic-cincinnati-sightseeing-cruise
            </li>
            <li>See the view from Carew Tower</li>
          </ul> */}
        </div>
        <div className={"brewery-title"}>{"Local Breweries & Taprooms"}</div>
        <div className={"brewery-collection"}>
          {breweries.map(brew => (
            <IntersectionVisible
              className={
                this.state[brew.id] ? "brewery-card visible" : "brewery-card"
              }
              onShow={e => this.onShow(brew.id)}
              key={brew.id}
            >
              <a href={brew.site} className={"brewery-link"}>
                <img src={brew.logo} />
              </a>
              {/* <div className={"brewery-card-name"}>{brew.name}</div> */}
            </IntersectionVisible>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default CincinnatiPage;
