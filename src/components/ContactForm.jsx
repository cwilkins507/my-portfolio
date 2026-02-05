import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service...' },
  { value: 'ai-automation', label: 'AI & Automation Consulting' },
  { value: 'python-scripting', label: 'Python Scripting & API Integration' },
  { value: 'aws-serverless', label: 'AWS & Serverless Architecture' },
];

const ContactForm = ({ email, initialService = '', onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialService,
    message: '',
  });

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'e70d96e8-39c9-44b1-b22a-6c48e41fb456',
          name: formData.name,
          email: formData.email,
          service: SERVICE_OPTIONS.find(s => s.value === formData.service)?.label || 'Not specified',
          message: formData.message || 'No message provided',
          subject: `Portfolio Contact: ${SERVICE_OPTIONS.find(s => s.value === formData.service)?.label || 'General Inquiry'}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' });
        if (onSuccess) onSuccess();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-teal-400 hover:text-teal-300 font-medium transition"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name <span className="text-teal-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-md border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none transition"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email <span className="text-teal-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-md border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
            Service Interest <span className="text-teal-400">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-md border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none transition"
          >
            {SERVICE_OPTIONS.map(option => (
              <option key={option.value} value={option.value} disabled={option.value === ''}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message <span className="text-gray-500">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-md border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none transition resize-none"
            placeholder="Tell me about your project..."
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 mb-4 p-3 bg-red-400/10 rounded-md">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-purple-600 hover:bg-teal-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:hover:scale-100 shadow-xl shadow-teal-500/30 flex items-center justify-center"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-gray-500 mt-4 text-sm">
        Or email me directly at{' '}
        <a href={`mailto:${email}`} className="text-teal-400 hover:text-teal-300 transition">
          {email}
        </a>
      </p>
    </form>
  );
};

export default ContactForm;
