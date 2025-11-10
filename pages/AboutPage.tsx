import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">About TrueLine</h1>
            <p className="text-xl text-light-text mt-4">Your Trusted Partner in Outdoor Excellence</p>
          </div>
          <div className="space-y-8 text-lg text-dark-text leading-relaxed">
            <p className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              Founded with a passion for nature and a commitment to quality, TrueLine Outdoor Services has been transforming properties into beautiful, functional, and sustainable outdoor living spaces for over a decade. We believe that a well-maintained yard is more than just curb appeal—it's an extension of your home, a place for relaxation, and a source of pride.
            </p>
            <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
              <p>
                Our mission is simple: to provide exceptional outdoor services through skilled craftsmanship, reliable communication, and an unwavering dedication to customer satisfaction. We strive to build lasting relationships with our clients by consistently exceeding their expectations.
              </p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Team</h2>
              <p>
                Our team is composed of experienced and passionate professionals who are experts in their respective fields, from landscaping architecture to expert fence installation. We are fully insured, and our crew is trained in the latest techniques and safety protocols to ensure every job is done right.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <img 
              src="https://picsum.photos/seed/team/800/400" 
              alt="Our team at work" 
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;