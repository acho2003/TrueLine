// src/pages/ContactPage.tsx

import React, { useState } from 'react';
import { IoIosCall } from 'react-icons/io';
import { MdEmail, MdOutlineShareLocation } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

// Import your QR code image
import qrCodeSrc from '../assets/QR.jpeg';

// Reusable component for contact items
const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex items-center my-6 group">
    <div className="w-16 h-16 bg-gray-100 group-hover:bg-secondary flex-shrink-0 flex items-center justify-center rounded-none transition-all duration-300">
      {React.cloneElement(icon as React.ReactElement, { className: "text-secondary group-hover:text-white transition-colors duration-300" })}
    </div>
    <div className="ml-5">
      <p className="font-open-sans text-base text-gray-500">{title}</p>
      <div className="font-montserrat text-lg font-semibold text-primary">{children}</div>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <div className="font-open-sans">

      {/* Main Content: Info & Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Contact Info & QR Code */}
          <div data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-3xl font-bold text-primary font-montserrat mb-4">Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Reach out to us via phone, email, or visit our location. For a quick chat, scan the QR code to connect with us on WhatsApp.
            </p>
            <ContactInfoItem icon={<IoIosCall size={30} />} title="Call Us Now">
              <a href="tel:555-123-4567" className="hover:text-secondary">(555) 123-4567</a>
            </ContactInfoItem>
            <ContactInfoItem icon={<MdEmail size={30} />} title="Send An Email">
              <a href="mailto:contact@trueline.com" className="hover:text-secondary">contact@trueline.com</a>
            </ContactInfoItem>
            <ContactInfoItem icon={<MdOutlineShareLocation size={30} />} title="Our Location">
              <p>123 Evergreen Ln, Seattle, WA</p>
            </ContactInfoItem>
          </div>

          {/* Column 2: Contact Form */}
          <div className="bg-primary p-8 md:p-12" data-aos="fade-left" data-aos-duration="1000">
            <h2 className="text-3xl font-bold text-white font-montserrat text-center mb-8">Send Us A Message</h2>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full h-14 px-4 bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-none focus:border-secondary focus:ring-0 outline-none transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full h-14 px-4 bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-none focus:border-secondary focus:ring-0 outline-none transition-colors"
                required
              />
              <textarea
                rows={5}
                placeholder="Write Message"
                className="w-full p-4 bg-transparent border border-gray-600 text-white placeholder-gray-400 rounded-none resize-none focus:border-secondary focus:ring-0 outline-none transition-colors"
              ></textarea>
              <button
                type="submit"
                className="w-full inline-block relative overflow-hidden group font-bold py-4 px-8 rounded-none border-2 border-secondary text-secondary transition-all duration-300"
              >
                <span className="absolute top-0 left-0 w-0 h-full bg-secondary transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      

     

      {/* Google Map Section */}
      <section data-aos="fade-up" data-aos-duration="1000">
        <iframe
          // IMPORTANT: Replace with your Google Maps embed code
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172134.3644917642!2d-122.48214844335936!3d47.6129432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA%2C%20USA!5e0!3m2!1sen!2s!4v1678886444000!5m2!1sen!2s"
          height={450}
          allowFullScreen={true}
          loading="lazy"
          className="w-full border-0 filter grayscale-[100%]"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;