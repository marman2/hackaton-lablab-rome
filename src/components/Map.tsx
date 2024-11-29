// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { useStore } from '../store/useStore';
// import 'leaflet/dist/leaflet.css';
// import { MapPin } from 'lucide-react';

// export default function Map() {
//   const { markers, addMarker } = useStore();
//   const [newMarkerDesc, setNewMarkerDesc] = useState('');

//   const handleMapClick = (e: any) => {
//     const { lat, lng } = e.latlng;
//     const newMarker = {
//       id: Date.now().toString(),
//       latitude: lat,
//       longitude: lng,
//       description: newMarkerDesc,
//       type: 'trash',
//       createdAt: new Date(),
//       createdBy: 'User'
//     };
//     addMarker(newMarker);
//     setNewMarkerDesc('');
//   };

//   return (
//     <div className="h-[600px] w-full relative">
//       <MapContainer
//         center={[41.9028, 12.4964]}
//         zoom={13}
//         className="h-full w-full"
//         onClick={handleMapClick}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {markers.map((marker) => (
//           <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
//             <Popup>
//               <div className="p-2">
//                 <p className="font-medium">{marker.description}</p>
//                 <p className="text-sm text-gray-500">
//                   Added by: {marker.createdBy}
//                 </p>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }