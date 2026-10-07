// No utm_* params here: UtmForwarder decorates this link at click time with the
// visitor's real stored attribution (src/components/UtmForwarder.tsx). Baking
// fixed utm_* values into this URL would block that — withUtm() only adds a
// param when it isn't already present on the link.
export const CALENDLY_BOOKING_URL = "https://calendly.com/learnwithleaders";
