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

class GalleryStore {
  selectedIndex;
  imageSet;
  constructor() {
    this.selectedIndex = 0;
    this.imageSet = gallarySet;
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

  get galleryImages() {
    return toJS(this.imageSet);
  }

  stepRight = () => {
    if (this.selectedIndex == null || !this.imageSet.length) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.imageSet.length;
  };
  stepLeft = () => {
    if (this.selectedIndex == null || !this.imageSet.length) return;
    this.selectedIndex =
      (this.imageSet.length + (this.selectedIndex - 1)) % this.imageSet.length;
  };

  setImage = imageId => {
    this.selectedIndex = this.imageSet
      .map((img, index) => ({ ...img, index }))
      .find(img => img.id === imageId).index;
  };
}

decorate(GalleryStore, {
  selectedIndex: observable,
  galleryImages: computed,
  stepRight: action,
  stepLeft: action,
  loaded: computed,
  selectedImage: computed,
  setImage: action
});

const galleryStore = new GalleryStore();

export default galleryStore;
