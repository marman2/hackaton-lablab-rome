import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useStore } from '../../store/useStore';
import MarkerForm from './MarkerForm';
import { Flag, Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapCenter({ coords }: { coords: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(coords, 15); // Zoom level 15 for search results
  }, [coords, map]);
  return null;
}

export default function Map() {
  const { markers, addMarker, currentUser } = useStore();
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCoords, setSearchCoords] = useState<[number, number] | null>(null);

  const handleLocationSelect = (lat: number, lng: number) => {
    if (!currentUser) {
      alert('Accedi per aggiungere un marker.');
      return;
    }
    setSelectedLocation([lat, lng]);
    setShowForm(true);
  };

  const handleMarkerSubmit = (markerData: Partial<Marker>) => {
    addMarker(markerData);
    setShowForm(false);
    setSelectedLocation(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const results = await response.json();
      if (results.length > 0) {
        const { lat, lon } = results[0];
        setSearchCoords([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('Nessun risultato trovato.');
      }
    } catch (error) {
      console.error('Errore nella ricerca:', error);
      alert('Errore durante la ricerca. Riprova.');
    }
  };

  return (
    <div className="relative h-[85vh]">

      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="absolute bottom-4 left-0 right-0 mx-auto z-[1000] w-full max-w-[95%] md:max-w-2xl px-2 sm:px-4"
        >
        <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-4 sm:items-center gap-4 sm:gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca una strada o un luogo"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
            >
            Cerca
          </button>
        </div>
      </form>

      {/* Map Container */}
      <div className="h-full">
        <MapContainer
          center={[41.9028, 12.4964]} // Default to Rome, Italy
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEvents onLocationSelect={handleLocationSelect} />

          {searchCoords && <MapCenter coords={searchCoords} />}

          {markers.map((marker) => (
            <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
              <Popup className="marker-popup">
                <div className="p-2 max-w-xs">
                  <p className="font-medium mb-2">{marker.description}</p>
                  {marker.images.length > 0 && (
                    <img
                      src={marker.images[0]}
                      alt="Posizione"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {marker.flags.map((flag) => (
                      <span
                        key={flag}
                        className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
                      >
                        <Flag className="w-3 h-3" />
                        {flag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Aggiunto da: {marker.createdBy}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {showForm && selectedLocation && (
          <MarkerForm
            position={selectedLocation}
            onSubmit={handleMarkerSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedLocation(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
