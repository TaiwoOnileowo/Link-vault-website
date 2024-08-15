import { Session } from "@/types";
export const postSession = async (session: Session) => {
  fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-extension-id": "bbgippochabbclmbgkkbbofljdfnbdop",
    },
    body: JSON.stringify({ session }),
  })
    .then((res) => res.json())
    .then((data) => console.log("datasesionssssssssssss", data))
    .catch((error) => console.error("error", error));
};
