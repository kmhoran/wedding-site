import routes from "../../constants/routes";

export const menuItems = [
  { url: routes.TheWedding, displayName: "The Wedding", rsvpDialog: false },
  { url: routes.OurStory, displayName: "Our Story", rsvpDialog: false },
  { url: routes.Photos, displayName: "Photos", rsvpDialog: false },
  { url: routes.Registry, displayName: "Registry", rsvpDialog: false },
  {url: routes.Cincinnati, displayName: 'Cincinnati', rsvpDialog: false},
  { url: '', displayName: "RSVP", rsvpDialog: true }
];
