// src/pages/GalleryPage.tsx
import React, { useState, useEffect, useRef } from 'react';
// IMPORTANT: Change the API call to get the curated items
import { getManagedGalleryItems } from '../services/api'; 
import Spinner from '../components/Spinner';
import { Camera, X, ChevronsLeftRight } from 'lucide-react';

// --- Types ---
// Update the interface to include the description
interface GalleryWork {
  _id: string;
  serviceType: string;
  description: string;
  beforePhotos: string[];
  afterPhotos: string[];
}

const API_BASE_URL = 'http://localhost:5000';

// ============================================================================
//   Image Comparison Slider Component
// ============================================================================
interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ImageCompareSlider: React.FC<ImageSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const handleMouseMove = (event: MouseEvent) => handleMove(event.clientX);
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={imageContainerRef}
      className="relative w-full aspect-[4/3] max-w-4xl mx-auto select-none overflow-hidden rounded-lg shadow-2xl"
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Top Layer) */}
      <img
        src={afterImage}
        alt="After"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
        draggable={false}
      />
      {/* Before Image (Bottom Layer) */}
      <img
        src={beforeImage}
        alt="Before"
        className="block w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `calc(${sliderPos}% - 1px)` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-primary rounded-full p-2 shadow-lg">
           <ChevronsLeftRight size={24} />
        </div>
      </div>
    </div>
  );
};


// ============================================================================
//   Main Gallery Page Component
// ============================================================================
const GalleryPage: React.FC = () => {
  const [works, setWorks] = useState<GalleryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<GalleryWork | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        // Use the new API function
        const galleryData = await getManagedGalleryItems();
        setWorks(galleryData);
      } catch (err: any) {
        setError(err.message || 'Failed to load our work.');
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 bg-red-100 p-4 rounded-md my-8 container mx-auto">{error}</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Our Portfolio</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From overgrown yards to pristine landscapes, witness the transformations we're proud of.
          </p>
        </div>

        {works.length === 0 ? (
          <p className="text-center text-gray-500 text-xl py-10">Our gallery is currently empty. Please check back soon for updates!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <div
                key={work._id}
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedWork(work)}
              >
                {/* Display the FIRST 'after' photo as the thumbnail */}
                <img
                  src={`${API_BASE_URL}/${work.afterPhotos[0]}`}
                  alt={work.serviceType}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{work.serviceType}</h3>
                  <p className="mt-1 text-sm opacity-90">{work.description}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white py-1 px-3 rounded-full text-xs font-semibold">
                  Click to Compare
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- The Modal --- */}
      {selectedWork && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fadeIn"
          onClick={() => setSelectedWork(null)}
        >
          <div 
            className="relative w-full max-w-5xl p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
          >
             <button
              onClick={() => setSelectedWork(null)}
              className="absolute -top-2 -right-2 z-10 bg-white text-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-200"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-white">{selectedWork.serviceType}</h2>
                <p className="text-gray-300">{selectedWork.description}</p>
            </div>
            
            <ImageCompareSlider 
              beforeImage={`${API_BASE_URL}/${selectedWork.beforePhotos[0]}`}
              afterImage={`${API_BASE_URL}/${selectedWork.afterPhotos[0]}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;