// src/pages/ServiceDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Service } from '../types';


const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get service ID from URL
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services/${id}`);
        if (!res.ok) throw new Error('Service not found');
        const data = await res.json();
        setService(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!service) return <div className="text-center py-20">Service not found.</div>;

  return (
    <>


      <main className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/services"
              className="text-primary font-semibold hover:underline"
            >
              &larr; Back to Services
            </Link>
          </div>

          {/* Service details grid */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <img
              src={`backend/${service.imageUrl.replace(/\\/g, '/')}`}
              alt={service.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />

            {/* Text */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
              {service.price && (
                <p className="text-xl font-semibold text-secondary mb-4">
                  ${service.price} / hour
                </p>
              )}
              <p className="text-gray-700 mb-6">{service.details}</p>

              <Link
                to="/booking"
                state={{ selectedService: service._id }}
                className="inline-block bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </main>

    </>
  );
};

export default ServiceDetails;
