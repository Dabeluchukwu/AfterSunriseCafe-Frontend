import ServiceCard from "./ServiceCard";

const SERVICES = [
  {
    title: "Custom Cakes",
    description:
      "Birthday, wedding, anniversary, or just-because — we design cakes that taste as good as they look. Choose your flavour, size, and decoration, and we'll bring your vision to life.",
     image: "/BakeryServices1.png",
    features: [
      "Any flavour: vanilla, chocolate, red velvet, fruit cake, and more",
      "Custom designs with 5–7 days' notice",
      "Edible prints and toppers available",
      "Delivery across Lagos",
    ],
  },
  {
    title: "Event & Catering Orders",
    description:
      "Planning a wedding, birthday, corporate event, or church programme? We cater pastries, small chops, and desserts in bulk — beautifully presented and delivered on time.",
    image: "/BakeryServices2.png",
    features: [
      "Custom packages for any guest count",
      "Pastries, small chops, dessert tables",
      "Setup and delivery available",
      "48-hour notice for large orders",
    ],
  },
  {
    title: "Corporate & Bulk Orders",
    description:
      "Weekly office pastries, client gifts, or staff appreciation boxes — we supply businesses across Lagos with fresh, consistent bakes on a schedule that works for you.",
     image: "/BakeryServices3.png",
    features: [
      "Recurring weekly or monthly deliveries",
      "Branded packaging available",
      "Invoice-friendly for company accounts",
      "Reliable, on-time delivery",
    ],
  },
  {
    title: "Custom Pastry Boxes",
    description:
      "Curated boxes of our best pastries — perfect as a gift, a thank-you, or just to treat yourself. Mix and match from our full menu.",
     image: "/BakeryServices4.png",
    features: [
      "Choose your own mix of pastries",
      "Beautiful gift-ready packaging",
      "Personalised note included",
      "Same-day pickup available",
    ],
  },
];

export default function ServiceList() {
  return (
    <div className="space-y-20">
      {SERVICES.map((s, i) => (
        <ServiceCard key={s.title} service={s} reverse={i % 2 === 1} />
      ))}
    </div>
  );
}