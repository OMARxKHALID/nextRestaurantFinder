import axios from "axios";

const getGooglePlace = (category, radius, lat, lng) =>
  axios.get("/api/google-place", {
    params: {
      category: category,
      radius: radius,
      lat: lat,
      lng: lng,
    },
  });

export { getGooglePlace };
