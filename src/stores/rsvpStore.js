import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  toJS,
  decorate
} from "mobx";
import { getSessionItem, saveSessionItem } from "../services/session";
import { guid } from "../services/utils";
import { saveRsvps } from "../services/rsvps";

class RsvpStore {
  rsvps;

  constructor() {
    this.localKey = "rsvps";
    this.rsvps = this.retrieveRsvps();
    autorun(() => {
      // console.log("autorun! ", this.ids);
      saveSessionItem(this.localKey, { data: this.rsvps }, true);
    });
  }

  retrieveRsvps = () => {
    const rsvpData = getSessionItem(this.localKey, true);
    return rsvpData ? rsvpData.data : toJS([]);
  };

  // activate = () => {
  //   console.log("rsvpStore Activated");
  // };

  get ids() {
    return this.rsvps.map(g => g.id).join(", ");
  }

  get hasRsvp() {
    return this.rsvps && this.rsvps.length > 0;
  }
  saveRsvp = update => {
    if (!update.id) {
      const newRsvp = {
        id: guid(),
        firstName: update.firstName,
        lastName: update.lastName,
        isAttending: update.isAttending,
        comments: update.isAttending ? update.comments : null
      };
      saveRsvps([newRsvp]);
      this.rsvps.push(newRsvp);
    } else {
      const newRsvps = this.rsvps
        .filter(g => g.id !== update.id)
        .map(g => ({ ...g }));
      const updateRsvp = {
        id: update.id,
        firstName: update.firstName,
        lastName: update.lastName,
        isAttending: update.isAttending,
        comments: update.isAttending ? update.comments : null
      };
      saveRsvps([updateRsvp]);
      newRsvps.push(updateRsvp);
      this.rsvps = newRsvps;
    }
  };
}

decorate(RsvpStore, {
  hasRsvp: computed,
  rsvps: observable,
  activate: action,
  saveRsvp: action,
  ids: computed
});

const rsvpStore = new RsvpStore();

export default rsvpStore;
