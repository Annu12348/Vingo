import React, { useEffect } from "react";
import L from "leaflet";
import { useSelector } from "react-redux";
import home from "/home.png";
import scooter from "/scooter.png";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const MapUpdater = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 15, { animate: true });
    }
  }, [lat, lng, map]);

  return null;
};

const DeliveryAcceptCreatingLiveTracking = ({ data }) => {
  const { liveLocation } = useSelector((store) => store.Map);

  const deliveryBoyLat =
    liveLocation?.latitude || data?.deliveryBoyLocation?.lat;

  const deliveryBoyLng =
    liveLocation?.longitude || data?.deliveryBoyLocation?.lon;
  
  const customerLat = data?.customerLocation?.lat;
  const customerLng = data?.customerLocation?.lon;

  if (!deliveryBoyLat || !deliveryBoyLng || !customerLat || !customerLng)
    return null;

  const path = [
    [deliveryBoyLat, deliveryBoyLng],
    [customerLat, customerLng],
  ];

  return (
    <div className="h-[310px] shadow-md mt-3 rounded overflow-hidden">
      <MapContainer
        center={[deliveryBoyLat, deliveryBoyLng]}
        zoom={15}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater lat={deliveryBoyLat} lng={deliveryBoyLng} />
        <Marker
          key={`${deliveryBoyLat}-${deliveryBoyLng}`}
          position={[deliveryBoyLat, deliveryBoyLng]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy</Popup>
        </Marker>
        <Marker position={[customerLat, customerLng]} icon={customerIcon}>
          <Popup>Customer</Popup>
        </Marker>
        <Polyline positions={path} color="blue" weight={4} />
      </MapContainer>
    </div>
  );
};

export default DeliveryAcceptCreatingLiveTracking;
