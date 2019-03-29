import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  toJS,
  decorate
} from "mobx";

class FlagStore {
  constructor() {
    this.active = true;
    this.flags = this.setFlags();
  }

  setFlags = () => ({
    weddingMap: false
  });

  isFeatureEnabled = name => {
    if (!this.active) return true;
    console.log(
      `finding flag ${name}: ${this.flags[name] ? "active" : "inactive"}`
    );
    return this.flags[name] != null ? this.flags[name] : false;
  };
}
decorate(FlagStore, {
  isFeatureEnabled: action
});

const flagStore = new FlagStore();
export default flagStore;
