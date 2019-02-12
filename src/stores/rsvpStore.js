import { observable, computed, action, autorun,toJS, decorate  } from "mobx";

class RsvpStore {
    hasRsvp;
    guests;

    constructor() {
        this.hasRsvp = false;
        this.guests = toJS([]);
    }

    activate = () => {
        console.log('rsvpStore Activated')
    }

    addGuest = (firstName, lastName, isAttending, mealId, hotelAssistance) => {
        // give the ui time to transition
        setTimeout(() => {
            this.guests.push({
                firstName,
                lastName,
                isAttending,
                mealId,
                hotelAssistance
            });
            this.hasRsvp = true;
        }, 500);
    }
}

decorate(RsvpStore, {
    hasRsvp:observable,
    guests: observable,
    activate: action,
    addGuest: action
})

const rsvpStore = new RsvpStore();

export default rsvpStore;