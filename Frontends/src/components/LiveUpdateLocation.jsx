import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";

const LiveUpdateLocation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.Auth);

  useEffect(() => {
    const updateLocation = async (lat, lon) => {
      const response = await instance.put(
        "/auth/update-location",
        { lat, lon },
        { withCredentials: true }
      );
      console.log(response.data);
    };
    navigator.geolocation.watchPosition((pos) =>
      updateLocation(pos.coords.latitude, pos.coords.longitude)
    );
  }, [user]);
  return <div></div>;
};

export default LiveUpdateLocation;
