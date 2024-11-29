import React, { useState } from 'react';
import { Camera, X, Tag } from 'lucide-react';
import { Marker } from '../../types';
import { cn } from '../../lib/utils';

interface MarkerFormProps {
  onSubmit: (marker: Partial<Marker>) => void;
  onCancel: () => void;
  position: [number, number];
}

export default function MarkerForm({ onSubmit, onCancel, position }: MarkerFormProps) {
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'trash' | 'recycling'>('trash');
  const [images, setImages] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);
  const [newFlag, setNewFlag] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFlag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFlag.trim() && !flags.includes(newFlag.trim())) {
      setFlags([...flags, newFlag.trim()]);
      setNewFlag('');
    }
  };

  const handleRemoveFlag = (flagToRemove: string) => {
    setFlags(flags.filter(flag => flag !== flagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      latitude: position[0],
      longitude: position[1],
      description,
      type,
      images,
      flags,
      status: 'active'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000] overflow-y-auto">
      <div className="bg-background border border-border rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Aggiungi un nuovo punto</h3>
          <button
            onClick={onCancel}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Descrizione
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              required
              placeholder="Descrivi ciò che hai trovato..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'trash' | 'recycling')}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="trash">Rifiuti</option>
              <option value="recycling">Riciclabile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tag
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFlag}
                onChange={(e) => setNewFlag(e.target.value)}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Aggiungi un tag (es. plastica, vetro)"
              />
              <button
                type="button"
                onClick={handleAddFlag}
                className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                <Tag className="w-5 h-5" />
              </button>
            </div>
            {flags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {flags.map((flag) => (
                  <span
                    key={flag}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {flag}
                    <button
                      type="button"
                      onClick={() => handleRemoveFlag(flag)}
                      className="hover:text-primary transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Immagini
            </label>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Aggiungi immagine
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Caricamento ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-background pt-4 border-t border-border flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Aggiungi Punto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
