// Utility to handle ResizeObserver loop limit error
export const debounceResizeObserver = (entries) => {
  const handler = () => {
    for (const entry of entries) {
      if (entry.target) {
        entry.target.dispatchEvent(new CustomEvent('resize'));
      }
    }
  };

  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(handler);
  } else {
    setTimeout(handler, 16);
  }
}; 