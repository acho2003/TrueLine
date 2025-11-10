import React from 'react';

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
);

const ContactPage: React.FC = () => {
  return (
    <div className="py-20 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Get In Touch</h1>
          <p className="text-lg text-light-text mt-4 max-w-2xl mx-auto">
            We're here to help! Contact us for a free quote or any questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold text-dark-text mb-6">Contact Information</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-4">
                <PhoneIcon className="w-6 h-6 text-primary"/>
                <a href="tel:555-123-4567" className="text-dark-text hover:text-primary">(555) 123-4567</a>
              </div>
              <div className="flex items-center gap-4">
                <MailIcon className="w-6 h-6 text-primary"/>
                <a href="mailto:contact@evergreen.com" className="text-dark-text hover:text-primary">contact@evergreen.com</a>
              </div>
            </div>
            <div className="mt-8">
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                    <WhatsAppIcon className="w-6 h-6" />
                    Chat with us on WhatsApp
                </a>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold text-dark-text mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input type="text" id="contact-name" placeholder="Your Name" className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"/>
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input type="email" id="contact-email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"/>
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea id="contact-message" rows={5} placeholder="Your Message" className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"></textarea>
              </div>
              <button type="submit" className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;