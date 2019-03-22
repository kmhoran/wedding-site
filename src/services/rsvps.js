import fetch from "node-fetch";
import endpoints from "../constants/endpoints";

export async function saveRsvps(guests) {
  console.log("saving rsvps: ", rsvps);
  const url = endpoints.saveRsvp;
  const options = {
    method: "POST",
    body: JSON.stringify({ guests }),
    headers: { "Content-Type": "application/json" }
  };
  console.log("url: ", url);
  console.log("options: ", options);
  const response = await fetch(url, options);
  if (response.status < 200 || response.status >= 300) {
    console.log("could not save rsvp: ", await response.text());
  }
  return await response.json();
}
