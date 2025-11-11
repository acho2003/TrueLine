// src/pages/ServicesPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';
import { Service } from '../types';
import Spinner from '../components/Spinner';
import { HiArrowLongRight } from "react-icons/hi2"; // Icon for the "read more" link

const API_BASE_URL = 'http://localhost:5000';

// A new, reusable component to render each service row
const ServiceRow: React.FC<{ service: Service; index: number; imagePosition: 'left' | 'right' }> = ({ service, index, imagePosition }) => {
  
  const imageBlock = (
    <div className="relative w-full h-full">
      <img
        src={`${API_BASE_URL}/backend/${service.imageUrl}`}
        alt={service.name}
        className="w-full h-full object-cover min-h-[300px]"
      />
      <div className={`hidden md:block absolute top-0 text-gray-200 text-6xl font-bold font-montserrat -z-10 ${imagePosition === 'left' ? '-right-16' : '-left-16'}`}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
  
  const textBlock = (
    <div className="relative mt-5 md:mt-0 h-full flex flex-col justify-center">
      <h4 className="text-base font-semibold text-secondary uppercase font-montserrat">
        OUTDOOR SERVICE
      </h4>
      <h3 className="text-2xl md:text-3xl text-primary font-semibold font-montserrat mt-2">
        <Link to={`/services/${service._id}`} className="hover:text-secondary transition-colors">
          {service.name}
        </Link>
      </h3>
      <p className="text-base text-gray-600 font-open-sans leading-relaxed my-8 relative pt-8 border-t border-gray-200">
        {/* Using a slice of the full description as a preview */}
        {service.description.slice(0, 150)}...
      </p>
      <Link to={`/services/${service._id}`} aria-label={`Read more about ${service.name}`}>
        <HiArrowLongRight size={35} className="text-primary hover:text-secondary transition-colors" />
      </Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center" data-aos="zoom-in-up" data-aos-duration="1000">
      {imagePosition === 'left' ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
    </div>
  );
};


const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false); // State to toggle view more/less

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err: any) {
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const servicesToShow = showAll ? services : services.slice(0, 3);

  return (
    <div className="bg-white py-20 lg:py-28 font-open-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16" data-aos="fade-up" data-aos-duration="1000">
          <h4 className="text-lg font-semibold text-secondary uppercase font-montserrat">
            OUR SERVICES
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold text-primary font-montserrat mt-2">
            Enjoy The Best Quality Outdoor Services
          </h1>
        </div>

        {loading ? <div className="flex justify-center"><Spinner /></div> : error ? <div className="text-center text-red-500">{error}</div> : (
          <div className="space-y-16">
            {servicesToShow.map((service, index) => (
              <ServiceRow
                key={service._id}
                service={service}
                index={index}
                imagePosition={index % 2 === 0 ? 'left' : 'right'} // Alternate layout
              />
            ))}

            {/* View More/Less Button */}
            {services.length > 3 && (
              <div className="flex justify-end mt-16">
                <button
                  onClick={() => setShowAll(prev => !prev)}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-none text-md transition-all duration-300"
                >
                  {showAll ? 'View Less' : 'View More'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;