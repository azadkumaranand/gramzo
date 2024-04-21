import Toast from "react-native-root-toast";
import { BASE_URL, DEV_URL, testvar } from "../constants/api";

export const showTost = (message, position = -60, duration = 3000) => {
  Toast.show(message, {
    duration,
    position,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    animationType: "slide",
  });
};

export const Date2Time = (d) => {
  const date = new Date(d);
  const h = date.getHours();
  const hr = date.getHours() % 12 || 12;
  const hours = hr.toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = h >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${period}`;
};

export const FETCH_API = async ({ url, method = "POST", body, token }) => {
  //[data, error]
  try {
    const res = await fetch(`${testvar ? DEV_URL : BASE_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res.ok) return [data, null];
    return [null, data];
  } catch (error) {
    return [null, error];
  }
};

export const capatilize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const reverseGeocoding = async (lat, long) => {
  const url = `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${lat},${long}&language=en`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0a0d7520d7msh6b59dfba9d211a9p13c3ecjsnaa652021d674",
      "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const results = data.results;
    return [results, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};
