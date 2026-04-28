import React from 'react';

const ServiceCards = ({ heading, subhead, cards = [] }) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-3">
        {heading}
      </h2>
      {subhead && (
        <p className="text-base md:text-lg text-moonlight-text-secondary leading-relaxed mb-8">
          {subhead}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col rounded-xl p-6 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-colors duration-300"
          >
            {card.tag && (
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 block">
                {card.tag}
              </span>
            )}
            <h3 className="text-lg font-serif font-bold text-[var(--color-text-primary)] mb-3 leading-snug">
              {card.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-grow">
              {card.description}
            </p>
            {card.meta && (
              <p className="text-xs text-[var(--color-text-faint)] font-mono uppercase tracking-wider pt-3 border-t border-[var(--color-border)]">
                {card.meta}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
