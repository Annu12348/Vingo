import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/reducer/AuthenticationSlice";

const LiveLocation = () => {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIFY_APIKEY;
  const { user } = useSelector(store => store.Auth)
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      );
      dispatch(setCity(response.data.results[0]))
    });
  }, [user]);
  return <div></div>;
};

export default LiveLocation;
