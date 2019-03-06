import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  toJS,
  decorate
} from "mobx";
import { getSessionItem, saveSessionItem } from '../services/session';
import { guid } from "../services/utils";

class RsvpStore {
  guests;

  constructor() {
    
    this.localKey = 'guests'
    this.guests = this.retrieveGuests();
    autorun(() => {
      console.log("autorun! ", this.ids);
    saveSessionItem(this.localKey, {data: this.guests}, true)
    });
  }

  retrieveGuests = () => {
    const guestData = getSessionItem(this.localKey, true);
    return guestData ? guestData.data : toJS([]);
  }

  activate = () => {
    console.log("rsvpStore Activated");
  };

  get ids () {
    return this.guests.map(g => g.id).join(", ");
  };

  get hasRsvp () {
    return this.guests && this.guests.length > 0;
  }
  addGuest = (firstName, lastName, isAttending, meal) => {
    // give the ui time to transition
    setTimeout(() => {
      this.guests.push({
        id: guid(),
        firstName,
        lastName,
        isAttending,
        meal
      });
    }, 500);
  };
}

decorate(RsvpStore, {
  hasRsvp: computed,
  guests: observable,
  activate: action,
  addGuest: action,
  ids: computed
});

const rsvpStore = new RsvpStore();

export default rsvpStore;
