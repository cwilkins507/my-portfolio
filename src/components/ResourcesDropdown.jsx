import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ResourcesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center hover:text-teal-400 transition"
      >
        Resources
        <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl border border-gray-700">
          <a
            href="/writing"
            className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-teal-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Written
          </a>
          <a
            href="/resources"
            className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-teal-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default ResourcesDropdown;