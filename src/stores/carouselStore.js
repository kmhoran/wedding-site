import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  toJS,
  decorate
} from "mobx";
import { gallarySet } from "../constants/photos";

class CarouselStore {
  selectedIndex;
  imageSet;
  job;
  isRunning;
  constructor() {
    this.selectedIndex = 0;
    this.imageSet = gallarySet;
    this.job = null;
    this.isRunning = false;
    // autorun(() => {
    // });
  }
  get loaded() {
    return this.imageSet !== null;
  }

  get selectedImage() {
    if (this.selectedIndex == null || !this.imageSet.length) return null;
    return toJS(this.imageSet[this.selectedIndex]);
  }

  // get thumbnails() {
  //   if (this.selectedIndex == null) return null;
  //   const set = toJS(this.imageSet);
  //   return set.slice(0, 5);
  // }

  stepRight = () => {
    if (this.selectedIndex == null || !this.imageSet.length) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.imageSet.length;
  };
  stepLeft = () => {
    if (this.selectedIndex == null || !this.imageSet.length) return;
    this.selectedIndex =
      (this.imageSet.length + (this.selectedIndex - 1)) % this.imageSet.length;
  };

  startSlideshow = () => {
    // console.log("carousel Activated");
    if (!this.isRunning) {
      this.job = setInterval(() => {
        this.stepRight();
      }, 3000);
      this.isRunning = true;
    }
  };

  stopSlideshow = () => {
    // console.log("carousel Deactivated");
    clearInterval(this.job);
    this.isRunning = false;
  };
}

decorate(CarouselStore, {
  selectedIndex: observable,
  imageSet: observable,
  stepRight: action,
  stepLeft: action,
  startSlideshow: action,
  stopSlideshow: action,
  loaded: computed,
  selectedImage: computed,
  isRunning: observable
});

const carouselStore = new CarouselStore();

export default carouselStore;
