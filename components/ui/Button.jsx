"use client";

import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-pill transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-secondary text-white hover:bg-secondary-600",
  secondary: "bg-white text-secondary border-2 border-secondary hover:bg-secondary-50",
  ghost: "bg-transparent text-ink hover:bg-accent-50",
  dark: "bg-ink text-white hover:bg-ink-soft",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

 
if (href) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls} {...props}>{children}</Link>;
}

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}