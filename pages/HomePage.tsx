// src/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getManagedGalleryItems } from '../services/api';
import { Service } from '../types';
import ServiceCard from '../components/ServiceCard';
import Spinner from '../components/Spinner';
import AboutSection from '../components/AboutSection';
import FeaturedServicesSection from '../components/FeaturedServicesSection';

import logoSrc from '../assets/logo.png';
import banner1 from '../assets/banner1.jpeg';

interface GalleryWork {
  _id: string;
  serviceType: string;
  afterPhotos: string[];
}

const API_BASE_URL = 'http://localhost:5000';

const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [works, setWorks] = useState<GalleryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, galleryData] = await Promise.all([
          getServices(),
          getManagedGalleryItems()
        ]);
        setServices(servicesData);
        setWorks(galleryData);
      } catch (err: any) {
        setError('Failed to load page content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const heroHeading = "WA’s Trusted Name in Outdoor Services".split(" ");

  return (
    <div className="font-open-sans">
      <section className="relative h-screen bg-black overflow-hidden">
        {/* --- MODIFIED: Added responsive background position classes --- */}
        <div 
          // bg-center is the default for mobile. On medium screens and up, it will also be centered.
          // You can change this, e.g., 'bg-top md:bg-center' to focus on the top for mobile.
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner1})`,
            animation: 'zoomIn 8s ease-in-out forwards'
          }}
        />
        
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative h-full flex flex-col justify-center container mx-auto px-4 text-left text-white z-10">
          <div className="max-w-2xl">
       
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight font-montserrat">
              {heroHeading.map((word, index) => (
                <span key={index} className="inline-block animate-fadeInUp" style={{ animationDelay: `${100 + index * 100}ms`}}>
                  {word}&nbsp;
                </span>
              ))}
            </h1>
            <p 
              className="text-lg md:text-xl mb-8 animate-fadeInUp"
              style={{ animationDelay: '600ms' }}
            >
              We create beautiful outdoor spaces. From pristine lawns to custom fences, your vision is our priority.
            </p>
            <Link 
              to="/booking" 
              className="inline-block relative overflow-hidden group font-bold py-4 px-10 rounded-none border-2 border-white transition-all duration-300 ease-in-out animate-fadeInUp"
              style={{ animationDelay: '800ms' }}
            >
              <span className="absolute top-0 left-0 w-0 h-full bg-[#6FAF4B] transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
              <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
                Get a Quote
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
 {loading ? (
        <div className="py-20 flex justify-center"><Spinner /></div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">{error}</div>
      ) : (
        <FeaturedServicesSection services={services} />
      )}
      
       <AboutSection />
      
      {/* Recent Work Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat">Our Recent Work</h2>
            <p className="text-gray-600 mt-2">See the quality and transformations we deliver.</p>
          </div>
           {loading ? <div className="flex justify-center"><Spinner /></div> : error ? <div className="text-center text-red-500">{error}</div> : works.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {works.slice(0, 3).map((work, index) => (
                    <div key={work._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 150}ms` }}>
                      <Link to="/gallery" className="group block relative overflow-hidden rounded-lg shadow-lg">
                         <img src={`${API_BASE_URL}/${work.afterPhotos[0]}`} alt={work.serviceType} className="w-full h-80 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="text-xl font-bold font-montserrat">{work.serviceType}</h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Link to="/gallery" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg text-md transition-colors">View Full Gallery</Link>
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