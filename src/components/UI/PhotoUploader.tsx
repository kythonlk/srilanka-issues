import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../hooks/useTranslation';
import { Image, X, Upload } from 'lucide-react';

interface PhotoUploaderProps {
  photos: string[];
  setPhotos: (photos: string[]) => void;
  maxPhotos?: number;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ 
  photos, 
  setPhotos, 
  maxPhotos = 4 
}) => {
  const { theme } = useStore();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  
  // In a real app, this would upload to a server
  // Here we're just simulating it with a FileReader
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    if (photos.length + files.length > maxPhotos) {
      setError(`You can only upload up to ${maxPhotos} photos`);
      return;
    }
    
    setError(null);
    
    // Process each file
    Array.from(files).forEach(file => {
      // Simulate upload by reading as data URL
      // In a real app, you'd upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setPhotos([...photos, result]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input
    e.target.value = '';
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };
  
  // For demo purposes, we'll also allow adding pexels sample images
  const addSamplePhoto = () => {
    if (photos.length >= maxPhotos) {
      setError(`You can only upload up to ${maxPhotos} photos`);
      return;
    }
    
    const sampleImages = [
      'https://images.pexels.com/photos/1030979/pexels-photo-1030979.jpeg',
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      'https://images.pexels.com/photos/1756325/pexels-photo-1756325.jpeg',
      'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg'
    ];
    
    // Add a random image that's not already in the photos array
    const availableImages = sampleImages.filter(img => !photos.includes(img));
    if (availableImages.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    setPhotos([...photos, availableImages[randomIndex]]);
    setError(null);
  };
  
  return (
    <div>
      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {t('submit.form.photos.label')}
      </label>
      
      {/* Photo preview grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative group aspect-square rounded overflow-hidden">
              <img 
                src={photo} 
                alt={`Photo ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Upload controls */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Real file upload - hidden but triggered by custom button */}
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="sr-only"
          disabled={photos.length >= maxPhotos}
        />
        
        {/* Custom file upload button */}
        <label
          htmlFor="photo-upload"
          className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
            photos.length >= maxPhotos
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          } ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } transition-colors`}
        >
          <Upload size={16} className="mr-2" />
          {t('submit.form.photos.add')}
        </label>
        
        {/* Sample photo button (for demo) */}
        <button
          type="button"
          onClick={addSamplePhoto}
          className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
            photos.length >= maxPhotos
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          } ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } transition-colors`}
          disabled={photos.length >= maxPhotos}
        >
          <Image size={16} className="mr-2" />
          Add Sample Photo
        </button>
        
        {/* Counter */}
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {photos.length}/{maxPhotos}
        </span>
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default PhotoUploader;