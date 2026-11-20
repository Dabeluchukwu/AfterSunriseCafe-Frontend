import Image from "next/image";
import { HiCheckCircle } from "react-icons/hi";
import FadeUp from "@/components/ui/FadeUp";

export default function ServiceCard({ service, reverse = false }) {
  return (
    <FadeUp>
      <div
        className={`grid md:grid-cols-2 gap-8 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative h-64 md:h-80 rounded-card overflow-hidden shadow-sm">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            {service.title}
          </h2>
          <p className="mt-3 text-ink-soft">{service.description}</p>
          <ul className="mt-5 space-y-2">
            {service.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-ink-soft">
                <HiCheckCircle className="text-secondary shrink-0 mt-0.5" size={20} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeUp>
  );
}