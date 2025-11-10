// src/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getManagedGalleryItems } from '../services/api'; // Use the managed items endpoint
import { Service } from '../types';
import ServiceCard from '../components/ServiceCard';
import Spinner from '../components/Spinner';

// Define the structure for the gallery items we'll show on the homepage
interface GalleryWork {
  _id: string;
  serviceType: string;
  afterPhotos: string[];
}

const API_BASE_URL = 'http://localhost:5000';

const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [works, setWorks] = useState<GalleryWork[]>([]); // State for gallery works, not reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services and gallery works in parallel
        const [servicesData, galleryData] = await Promise.all([
          getServices(),
          getManagedGalleryItems() // Fetch the curated gallery items
        ]);
        setServices(servicesData);
        setWorks(galleryData); // Set the gallery state
      } catch (err: any) {
        setError('Failed to load page content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section (No changes needed here) */}
      <section 
        className="relative bg-cover bg-center text-white py-32 md:py-48" 
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight animate-fadeInUp">
            Crafting Beautiful Outdoor Spaces
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fadeInUp delay-200ms">
            From pristine lawns to custom fences, we bring your outdoor vision to life with professional, reliable service.
          </p>
          <Link 
            to="/booking" 
            className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-fadeInUp delay-400ms"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      {/* Services Section (No changes needed here) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Services</h2>
            <p className="text-gray-600 mt-2">Quality services to meet all your outdoor needs.</p>
          </div>
          {loading ? <div className="flex justify-center"><Spinner /></div> : error ? <div className="text-center text-red-500">{error}</div> : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.slice(0, 4).map((service, index) => (
                  <div key={service._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 150}ms` }}>
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/services" className="text-primary hover:text-primary-dark font-semibold text-lg">
                    View All Services &rarr;
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* --- NEW: Recent Work Section (Replaces Reviews) --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Recent Work</h2>
            <p className="text-gray-600 mt-2">See the quality and transformations we deliver.</p>
          </div>
           {loading ? (
             <div className="flex justify-center"><Spinner /></div>
           ) : error ? (
             <div className="text-center text-red-500">{error}</div>
           ) : works.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Show up to 3 of the latest projects */}
                  {works.slice(0, 3).map((work, index) => (
                    <div key={work._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 150}ms` }}>
                      <Link to="/gallery" className="group block relative overflow-hidden rounded-lg shadow-lg">
                         <img
                          // Use the first "after" photo as the thumbnail
                          src={`${API_BASE_URL}/${work.afterPhotos[0]}`}
                          alt={work.serviceType}
                          className="w-full h-80 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="text-xl font-bold">{work.serviceType}</h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Link to="/gallery" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg text-md transition-colors">
                      View Full Gallery
                  </Link>
                </div>
              </>
           ) : (
            <p className="text-center text-gray-500">No projects to display yet. Check back soon!</p>
           )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;