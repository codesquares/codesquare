import { Code2, Palette, LineChart, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ name: '', email: "", message: "" });
  const [status, setStatus] = useState(''); // Form submission status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: "", message: "" });
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('Failed to send message');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-primary text-white">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8" />
              <span className="text-2xl font-bold">CODESQUARE</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="hover:text-secondary transition">Services</a>
              <a href="#team" className="hover:text-secondary transition">Team</a>
              <a href="#contact" className="hover:text-secondary transition">Contact</a>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Transform Your Digital Journey</h1>
              <p className="text-xl mb-8">Expert training in web development, product design, and product management.</p>
              <p className="text-xl mb-8">  Build, Deploy and Manage products quickly.</p>
              <a href="#contact" className="bg-secondary text-primary px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition inline-flex items-center">
                Get Started
                <ChevronRight className="ml-2" />
              </a>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Code2 className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">Web Development</h3>
              <p className="text-gray-600">Master modern web technologies and frameworks with hands-on training from industry experts.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Palette className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">Product Design</h3>
              <p className="text-gray-600">Learn UI/UX design principles and create stunning digital experiences that users love.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <LineChart className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">Product Management</h3>
              <p className="text-gray-600">Develop strategic thinking and learn to lead product teams to successful outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="../assets/Obamzy gif.png"
                alt="Team member"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">Olu Idowu</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            <div className="text-center">
              <img
                src="../assets/Foxtel gif.png"
                alt="Team member"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">Victor Gwatana</h3>
              <p className="text-gray-600">Design Director</p>
            </div>
            <div className="text-center">
              <img
                src="../assets/Micheal gif.png"
                alt="Team member"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">Mich Faniyi</h3>
              <p className="text-gray-600">Research Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-8">
                <Mail className="h-6 w-6 mr-4" />
                <span>codesquareltd@gmail.com</span>
              </div>
              <div className="flex items-center mb-8">
                <Phone className="h-6 w-6 mr-4" />
                <span>+234 (813) 195-2778</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-4" />
                <span>123 Tech Street, Digital City, 12345</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="text"
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Your name" 
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-secondary" 
                required 
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Your email" 
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-secondary" 
                required 
              />
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Your message" 
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-secondary h-32" 
                required 
              />
              <button 
                type="submit" 
                className="bg-secondary text-primary px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
                disabled={status === 'Sending...'}
              >
                {status === 'Sending...' ? 'Sending...' : 'Send Message'}
              </button>
              {status && status !== 'Sending...' && (
                <p className={`text-sm ${status.includes('Error') ? 'text-red-300' : 'text-green-300'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} CODESQUARE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;