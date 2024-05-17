import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { SvgIcon } from '@mui/material';
import ReactDOMServer from 'react-dom/server';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BuildIcon from '@mui/icons-material/Build';

// Define custom icon using Material-UI icon
const customIcon = L.divIcon({
  className: 'custom-marker-icon',
  html: ReactDOMServer.renderToString(
    <SvgIcon>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </SvgIcon>
  ),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const MapComponent = () => {
  return (
    <MapContainer
      center={[9.145, 40.489673]}
      zoom={6}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[9.145344, 40.489673]} icon={customIcon}>
        <Popup>
          A marker for OTHER MACHINERY
        </Popup>
      </Marker>
      <Marker position={[48.145, 40.489673]} icon={customIcon}>
        <Popup>
          A TRACKTER AVAILABLE. <br /><BuildIcon/>
        </Popup>
      </Marker>
      <Marker position={[4.73115, 40.91017]} icon={customIcon}>
        <Popup>
          HERE ALSO <br />
          <AgricultureIcon/>
        </Popup>
      </Marker>
      <Marker position={[5.145344, 40.489673]} icon={customIcon}>
        <Popup>
          A marker for OTHER MACHINERY
        </Popup>
      </Marker>
      <Marker position={[34.145, 40.489673]} icon={customIcon}>
        <Popup>
          A TRACKTER AVAILABLE. <br /><BuildIcon/>
        </Popup>
      </Marker>
      <Marker position={[9.73115, 34.91017]} icon={customIcon}>
        <Popup>
          HERE ALSO <br />
          <AgricultureIcon/>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
