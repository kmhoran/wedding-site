import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  toJS,
  decorate
} from "mobx";
import { throttle } from "lodash";
import { gallarySet } from "../constants/photos";

const MEDIA_PHONE = 889,
  MEDIA_DESKTOP = 890;

class WindowStore {
  constructor() {
    this.windowWidth = window.innerWidth;
    this.screenMode = this.windowWidth;
    this.addResizeListener();
    // autorun(() => {
    // });
  }

  get isMobile() {
    return toJS(this.screenMode <= MEDIA_PHONE);
  }

  updateWindowWidth = () => {
    const prevWidth = this.windowWidth;
    this.windowWidth = window.innerWidth;

    const newScreenMode = this.updateScreenMode(window.innerWidth, prevWidth);
    if (newScreenMode) this.screenMode = newScreenMode;
  };

  updateScreenMode = (newWidth, prevWidth) => {
    if (newWidth >= MEDIA_DESKTOP) {
      if (prevWidth < MEDIA_DESKTOP) {
        return MEDIA_DESKTOP;
      }
    } else if (prevWidth > MEDIA_PHONE) {
      return MEDIA_PHONE;
    }
    return false;
  };

  addResizeListener = () => {
    const resizeListener = throttle(this.updateWindowWidth, 100);
    window.addEventListener("resize", resizeListener);
    this.updateWindowWidth();
  };
}

decorate(WindowStore, {
  screenMode: observable,
  isMobile: computed,
  updateWindowWidth: action
});

const windowStore = new WindowStore();

export default windowStore;
