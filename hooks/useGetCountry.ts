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
        setLocation(userLocation);
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, []);

  const getPricingBasedOnLocation = ({
    location,
    price,
  }: {
    location: string;
    price: number;
  }) => {
    switch (location) {
      case "US":
        return "$50";
      case "UK":
        return "£40";
      case "NG":
        return "₦20,000";
      default:
        return "$50";
    }
  };

  return { price, location, getPricingBasedOnLocation };
};

export default useGetCountry;
