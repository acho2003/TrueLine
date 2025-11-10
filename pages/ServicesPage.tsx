import React, { useState, useEffect } from 'react';
// --- CORRECTED IMPORTS ---
import { getServices } from '../services/api'; // Import FUNCTIONS from api
import { Service } from '../types';             // Import TYPES from types
import ServiceCard from '../components/ServiceCard';
import Spinner from '../components/Spinner';

const ServicesPage: React.FC = () => {
  // ... rest of the component code is correct ...
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  // JSX remains the same
  return (
    <div className="py-20 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Services</h1>
          <p className="text-lg text-light-text mt-4 max-w-2xl mx-auto">
            We offer a comprehensive range of outdoor services to keep your property looking its best year-round.
          </p>
        </div>
        {loading ? <div className="flex justify-center"><Spinner /></div> : error ? <div className="text-center text-red-500">{error}</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div key={service._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                        <ServiceCard service={service} />
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;