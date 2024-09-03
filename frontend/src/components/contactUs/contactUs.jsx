import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPenFancy, FaPaperPlane } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import logo from '../../assets/images/logo.jpg'; // Replace with your logo path
import logo_img_black from '../../assets/images/logo_img_black.png'; // Replace with your black logo path
import { Link } from 'react-router-dom';
import { mailReciever } from '../../api/mailReciever';
import toast from 'react-hot-toast';
import { mailAcknowledgment } from '../../api/mailAcknowledgement';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    // Simple form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      // Replace this with your actual API call
      await mailReciever(formData);
      await mailAcknowledgment(formData);

      toast.success('Mail Sent Successfully')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setLoading(false);
      navigate('/')
    } catch (err) {
        console.error(err);
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col lg:flex-row lg:justify-evenly min-h-screen bg-black w-full max-w-screen-2xl px-10">
      <div className="mt-14 hidden lg:block">
        <img src={logo} alt="logo" />
      </div>
      <div className="mt-10 block lg:hidden w-20 mb-20">
        <img src={logo_img_black} alt="logo" />
      </div>
      <div className="bg-black w-full max-w-md">
        <h2 className="text-3xl text-center text-white font-mono mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xl text-white  font-mono pl-4 pb-1">Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-12 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
              <FaUser className="absolute top-3 left-4 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-xl text-white font-mono pl-4 pb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-12 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
                required
              />
              <FaEnvelope className="absolute top-3 left-4 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-xl text-white font-mono pl-4 pb-1">Subject</label>
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-12 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
                required
              />
              <FaPenFancy className="absolute top-3 left-4 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-xl text-white font-mono pl-4 pb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              placeholder="Your message..."
              required
            />
          </div>
          {success && (
            <p className="text-center text-green-500 font-semibold">{success}</p>
          )}
          {error && (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          )}
          
            <div className="flex flex-col items-center lg:flex-row lg:justify-between mt-4">
                <Link to="/" className="mb-4 lg:mb-0 lg:mr-auto">
                    <span className="font-mono text-slate-200 cursor-pointer hover:underline">
                        Back to HomePage
                    </span>
                </Link>

            <button
                type="submit"
                className="w-full lg:w-[200px] bg-blue-500 text-[#0f031c] py-2 rounded-full hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold duration-100 flex items-center justify-center"
                disabled={loading}
            >
            {loading ? (
                <ClipLoader color="#0f031c" size={20} />
                )    : (
            <>
                Send Message
            <FaPaperPlane className="ml-2" />
            </>
            )}
            </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default ContactUs;
