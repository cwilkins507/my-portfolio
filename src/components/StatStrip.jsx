import React from 'react';

const defaultStats = [
  { value: '$5M', label: 'Annual savings from automation systems built at Ford Motor Company' },
  { value: '600k+', label: 'Daily events processed through connected-vehicle systems' },
  { value: '12 yrs', label: 'Enterprise engineering across automotive and finance' },
];

const StatStrip = ({ stats = defaultStats }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-8 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {stats.map((stat) => (
          <div key={stat.value} className="flex flex-col">
            <span className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-accent)] leading-none mb-3">
              {stat.value}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatStrip;
