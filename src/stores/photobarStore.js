import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  toJS,
  decorate
} from "mobx";
import { guid } from "../services/utils";
import { gallarySet } from "../constants/photos";

class PhotobarStore {
  slotCount;
  images;
  imageSet;
  lastIndexSeen;
  onDisplay;
  job;
  constructor() {
    this.slotCount = 0;
    this.images = null;
    this.imageSet = gallarySet;
    this.lastIndexSeen = null;
    this.onDisplay = [];
    this.job = null;
    this.setImages();
    console.log(toJS(this.imageSet));
    autorun(() => {
      console.log("autorun! ");
    });
  }

  get loaded() {
    return (
      this.imageSet && this.lastIndexSeen !== null && this.onDisplay.length > 0
    );
  }

  get jsImages() {
    return toJS(this.images);
  }

  setImages = () => {
    this.images = {
      0: {
        a: { ...this.imageSet[0] },
        b: {},
        showA: true,
        onDisplay: 0
      },
      1: {
        a: { ...this.imageSet[1] },
        b: {},
        showA: true,
        onDisplay: 1
      },
      2: {
        a: { ...this.imageSet[2] },
        b: {},
        showA: true,
        onDisplay: 3
      },
      3: {
        a: { ...this.imageSet[3] },
        b: {},
        showA: true,
        onDisplay: 3
      }
    };
    this.lastIndexSeen = 3;
    this.onDisplay = [0, 1, 2, 3];
  };

  shuffleImages = () => {
    if (!this.loaded) return;
    const arrLength = this.imageSet.length;
    const newImages = {
      0: {
        ...this.images["0"],
        a: { ...this.images["0"].a },
        b: { ...this.images["0"].b }
      },
      1: {
        ...this.images["1"],
        a: { ...this.images["1"].a },
        b: { ...this.images["1"].b }
      },
      2: {
        ...this.images["2"],
        a: { ...this.images["2"].a },
        b: { ...this.images["2"].b }
      },
      3: {
        ...this.images["3"],
        a: { ...this.images["3"].a },
        b: { ...this.images["3"].b }
      }
    };
    let nextIndex = (this.lastIndexSeen + 1) % arrLength;
    let nextToUpdateId;
    let confliftExists = false;
    do {
      // image is already displayed
      if (this.onDisplay.indexOf(nextIndex) >= 0) {
        confliftExists = true;
        nextIndex = (nextIndex + 1) % arrLength;
        continue;
      }
      // cell already contains image
      nextToUpdateId = Math.floor(Math.random() * 4);
      if (!this.images[nextToUpdateId]) {
        confliftExists = true;
        continue;
      }
      confliftExists = this.images[nextToUpdateId].onDisplay === nextIndex;
    } while (confliftExists);

    const removedFromView = this.images[nextToUpdateId].onDisplay;
    if (this.images[nextToUpdateId].showA) {
      newImages[nextToUpdateId] = {
        a: { ...this.images[nextToUpdateId].a },
        showA: false,
        b: { ...this.imageSet[nextIndex] },
        onDisplay: nextIndex
      };
    } else {
      newImages[nextToUpdateId] = {
        b: { ...this.images[nextToUpdateId].b },
        showA: true,
        a: { ...this.imageSet[nextIndex] },
        onDisplay: nextIndex
      };
    }
    const newOndisplay = this.onDisplay.filter(x => {
      return x !== removedFromView;
    });
    newOndisplay.push(nextIndex);
    this.onDisplay = newOndisplay;
    this.images = newImages;
    this.lastIndexSeen = nextIndex;
  };

  activate = () => {
    console.log("photoBarStore Activated");
    this.job = setInterval(() => {
      this.shuffleImages();
    }, 5000);
  };

  deactivate = () => {
    console.log("photoBarStore Deactivated");
    clearInterval(this.job);
  };
}

decorate(PhotobarStore, {
  images: observable,
  activate: action,
  deactivate: action,
  loaded: computed,
  jsImages: computed
});

const photobarStore = new PhotobarStore();

export default photobarStore;
