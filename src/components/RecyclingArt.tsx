import React from 'react';
import { Palette } from 'lucide-react';

export default function RecyclingArt() {
  const projects = [
    {
      title: "Giardino con Bottiglie di Plastica",
      image: "https://i.ibb.co/VLx6Cvc/giardino.webp",
      description: "Trasforma le bottiglie di plastica in giardini sospesi",
      materials: ["Bottiglie di plastica", "Terriccio", "Semi", "Corda"]
    },
    {
      title: "Arte con Giornali",
      image: "https://i.ibb.co/SV2PLkF/giornali.webp",
      description: "Crea bellissime sculture utilizzando vecchi giornali",
      materials: ["Giornali", "Colla", "Vernice"]
    },
    {
      title: "Lanterne con Lattine",
      image: "https://i.ibb.co/1nTJhDb/lanterne.webp",
      description: "Realizza lanterne decorative con lattine di metallo",
      materials: ["Lattine di metallo", "Martello", "Chiodo", "Candele tealight"]
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-8">
        <Palette className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold">Progetti di Arte con il Riciclo</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div>
                <h4 className="font-medium mb-2">Materiali necessari:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {project.materials.map((material, idx) => (
                    <li key={idx}>{material}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
