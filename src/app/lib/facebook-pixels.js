export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
  if (!window.fbq) return;
  window.fbq('track', 'PageView');
};

export const event = (name, options = {}) => {
  if (!window.fbq) return;
  window.fbq('track', name, options);
};
