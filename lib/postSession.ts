import { Session } from "@/types";
export const postSession = async (session: Session | null) => {
  fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-extension-id": "alglfcchpihiepimpbkjflbhniilbnca",
    },
    body: JSON.stringify({ session }),
  })
    .then((res) => res.json())
    .then((data) => console.log("datasesionssssssssssss", data))
    .catch((error) => console.error("error", error));
};
