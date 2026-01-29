import React from 'react'
import L from "leaflet"
import home from "/home.png";
import scooter from "/scooter.png";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})

const DeliveryAcceptCreatingLiveTracking = ({ data }) => {
  const deliveryBoyLat = data.deliveryBoyLocation.lat
  const deliveryBoyLon = data.deliveryBoyLocation.lon
  const customerLat = data.customerLocation.lat
  const customerLon = data.customerLocation.lon

  const path = [
    [deliveryBoyLat, deliveryBoyLon],
    [customerLat, customerLon]
  ];

  const center = [deliveryBoyLat, deliveryBoyLon]
  return (
    <div className='h-[310px] shadow-md mt-3'>
      <MapContainer
        className={"w-full h-full"}
        center={center}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[deliveryBoyLat, deliveryBoyLon]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy</Popup>
        </Marker>
        <Marker
          position={[customerLat, customerLon]}
          icon={customerIcon}
        >
          <Popup>Customer</Popup>
        </Marker>
        <Polyline positions={path} color='blue' weight={4} />
      </MapContainer>
    </div>
  )
}

export default DeliveryAcceptCreatingLiveTracking
