import { get } from "http";
import { useState, useEffect } from "react";

const useGetCountry = () => {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=c8ff45b0de2d99")
      .then((response) => response.json())
      .then((data) => {
        const userLocation = data.country;
        console.log("User location:", userLocation);
        setLocation(userLocation);
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, [setLocation]);
  console.log("Location:", location);
  const getPricingBasedOnLocation = (price: string) => {
    let actualPrice = price;
    if (price === "1.2") {
      switch (location) {
        case "US":
          actualPrice = "$1.20";
        case "UK":
          actualPrice = "£1.09";
        case "NG":
          actualPrice = "₦1,600";
      }
    } else if (price === "5.00") {
      switch (location) {
        case "US":
          actualPrice = "$5.00";
        case "UK":
          actualPrice = "£4.50";
        case "NG":
          actualPrice = "₦8,000";
      }
    } else if (price === "8.50") {
      switch (location) {
        case "US":
          actualPrice = "$8.50";
        case "UK":
          actualPrice = "£9.50";
        case "NG":
          actualPrice = "₦15,000";
      }
    } else {
      actualPrice = `$${price}`;
    }
    return actualPrice;
  };

  return { price, location, getPricingBasedOnLocation };
};

export default useGetCountry;
