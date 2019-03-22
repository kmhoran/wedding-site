import fetch from "node-fetch";
import endpoints from "../constants/endpoints";

export async function saveRsvps(guests) {
  const url = endpoints.saveRsvp;
  const options = {
    method: "POST",
    body: JSON.stringify({ guests }),
    headers: { "Content-Type": "application/json" }
  };
  const response = await fetch(url, options);
  if (response.status < 200 || response.status >= 300) {
    console.error("could not save rsvp: ", await response.text());
  }
  return await response.json();
}
