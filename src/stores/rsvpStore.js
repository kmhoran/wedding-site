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

class RsvpStore {
  guests;

  constructor() {
    this.localKey = "guests";
    this.guests = this.retrieveGuests();
    autorun(() => {
      console.log("autorun! ", this.ids);
      saveSessionItem(this.localKey, { data: this.guests }, true);
    });
  }

  retrieveGuests = () => {
    const guestData = getSessionItem(this.localKey, true);
    return guestData ? guestData.data : toJS([]);
  };

  activate = () => {
    console.log("rsvpStore Activated");
  };

  get ids() {
    return this.guests.map(g => g.id).join(", ");
  }

  get hasRsvp() {
    return this.guests && this.guests.length > 0;
  }
  saveGuest = update => {
    if (!update.id) {
      // give the ui time to transition
      setTimeout(() => {
        this.guests.push({
          id: guid(),
          firstName: update.firstName,
          lastName: update.lastName,
          isAttending: update.isAttending,
          comments: update.isAttending ? update.comments : null
        });
      }, 500);
    } else {
      const newGuests = [];
      this.guests.forEach(g => {
        if (g.id !== update.id) newGuests.push({ ...g });
      });
      newGuests.push({
        id: update.id,
        firstName: update.firstName,
        lastName: update.lastName,
        isAttending: update.isAttending,
        comments: update.isAttending ? update.comments : null
      });
      this.guests = newGuests;
    }
  };
}

decorate(RsvpStore, {
  hasRsvp: computed,
  guests: observable,
  activate: action,
  saveGuestt: action,
  ids: computed
});

const rsvpStore = new RsvpStore();

export default rsvpStore;
