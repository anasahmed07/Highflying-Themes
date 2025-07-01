'use client'
import { useState } from 'react';
import { apiService, ContactMessage } from '@/lib/api';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Switch Theme",
  description: "Contact Switch Theme for support, questions, or feedback. Reach out to our team for help with Nintendo 3DS/2DS theme uploads and account issues.",
  openGraph: {
    title: "Contact Us | Switch Theme",
    description: "Contact Switch Theme for support, questions, or feedback. Reach out to our team for help with Nintendo 3DS/2DS theme uploads and account issues.",
    url: "https://switchthemes.vercel.app/contact-us",
    siteName: "Switch Theme",
    images: [
      {
        url: "/switch-theme-logo.svg",
        width: 512,
        height: 512,
        alt: "Switch Theme Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Switch Theme",
    description: "Contact Switch Theme for support, questions, or feedback. Reach out to our team for help with Nintendo 3DS/2DS theme uploads and account issues.",
    images: ["/switch-theme-logo.svg"],
  },
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear success/error messages when user starts typing
    if (submitSuccess || submitError) {
      setSubmitSuccess(false);
      setSubmitError('');
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      await apiService.submitContactMessage(formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setValidationErrors({});
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mix-blend-difference text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Whether you have questions, suggestions, or just want to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <h2 className="mix-blend-difference text-2xl font-light text-white mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className='mix-blend-difference'>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <p className="text-gray-300">hello@switchtheme.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div className='mix-blend-difference'>
                  <h3 className="text-white font-medium mb-1">Discord</h3>
                  <p className="text-gray-300">Join our community server</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className='mix-blend-difference'>
                  <h3 className="text-white font-medium mb-1">Response Time</h3>
                  <p className="text-gray-300">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="mix-blend-difference text-2xl font-light text-white mb-6">Send us a Message</h2>
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg mb-6">
                <p className="text-green-400 text-sm">
                  Thank you for your message! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg mb-6">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#1E1E1E] border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    validationErrors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                  placeholder="Your name"
                />
                {validationErrors.name && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#1E1E1E] border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    validationErrors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                  placeholder="your.email@example.com"
                />
                {validationErrors.email && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#1E1E1E] border rounded-lg text-white focus:outline-none transition-colors ${
                    validationErrors.subject 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                >
                  <option value="">Select a topic</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feature Suggestion">Feature Suggestion</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Other">Other</option>
                </select>
                {validationErrors.subject && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.subject}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="mix-blend-difference block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#1E1E1E] border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                    validationErrors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                  placeholder="Tell us how we can help..."
                ></textarea>
                {validationErrors.message && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-light text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 mb-6">
            Can&apos;t find what you&apos;re looking for? Check out our FAQ or reach out to us directly.
          </p>
          <button className="px-8 py-3 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200">
            View FAQ
          </button>
        </div>
      </div>
    </div>
  );
}
  