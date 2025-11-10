import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking, getServices } from '../services/api';
import { Service } from '../types';

const ADMIN_WHATSAPP_NUMBER = '97517781187'; // Replace with your admin WhatsApp number in international format without + or spaces

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedService } = location.state || {};

  const [formData, setFormData] = useState({
    name: '', phone: '', address: '',
    serviceType: selectedService || '',
    preferredDateTime: '', notes: '',
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchServicesForDropdown = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error("Could not load services for dropdown", err);
      }
    };
    fetchServicesForDropdown();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.phone || !formData.address || !formData.serviceType || !formData.preferredDateTime) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Save booking in backend
      await createBooking(formData);
      setSuccess('Your booking request has been sent! We will contact you shortly.');

      // 2️⃣ Construct WhatsApp message
      const message = `
New Booking!
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Service: ${formData.serviceType}
Preferred Date & Time: ${new Date(formData.preferredDateTime).toLocaleString()}
Notes: ${formData.notes || 'N/A'}
      `;

      const whatsappURL = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      // 3️⃣ Open WhatsApp Web / App
      window.open(whatsappURL, '_blank');

      // 4️⃣ Reset form
      setFormData({ name: '', phone: '', address: '', serviceType: '', preferredDateTime: '', notes: '' });
      setTimeout(() => navigate('/'), 3000);

    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Book a Service</h1>
            <p className="text-light-text mt-2">Fill out the form below and we'll get back to you soon.</p>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-text">Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-dark-text">Phone Number</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-dark-text">Address</label>
              <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-dark-text">Service Type</label>
              <select name="serviceType" id="serviceType" value={formData.serviceType} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service._id} value={service.name}>{service.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="preferredDateTime" className="block text-sm font-medium text-dark-text">Preferred Date & Time</label>
              <input type="datetime-local" name="preferredDateTime" id="preferredDateTime" value={formData.preferredDateTime} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-dark-text">Additional Notes (optional)</label>
              <textarea name="notes" id="notes" rows={4} value={formData.notes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
            </div>
            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                {loading ? 'Submitting...' : 'Request Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
