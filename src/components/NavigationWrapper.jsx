import { useState } from 'react';
import Navigation from './Navigation';
import SearchOverlay from './SearchOverlay';

export default function NavigationWrapper({ portfolioData, articles }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Navigation
        portfolioData={portfolioData}
        onSearchClick={() => setIsSearchOpen(true)}
      />
      <SearchOverlay
        articles={articles || []}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
