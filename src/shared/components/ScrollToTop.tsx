import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ScrollToTop: FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (history.action === 'POP') {
      return;
    }
    // In all other cases, check fragment/scroll to top
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  });

  return <div />;
};

export default ScrollToTop;
