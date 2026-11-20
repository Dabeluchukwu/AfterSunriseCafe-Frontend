export const CONTACT = {
  phone: "07042660291",
  phoneDisplay: "0704 266 0291",
  whatsapp: "08088659045",
  whatsappDisplay: "0808 865 9045",
  email: "aftersunrise001@gmail.com",
  address: "After Sunrise Bakery, Lagos, Nigeria",
  hours: "Mon–Sat: 7:00 AM – 8:00 PM · Sun: 9:00 AM – 4:00 PM",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

// tel: and wa.me links built from CONTACT
export const PHONE_LINK = `tel:+234${CONTACT.phone.replace(/^0/, "")}`;
export const WHATSAPP_LINK = `https://wa.me/234${CONTACT.whatsapp.replace(/^0/, "")}`;