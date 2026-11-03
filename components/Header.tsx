"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, waLink } from "@/data/site";

const links = [
  ["/products", "Products"],
  ["/drivers", "Drivers"],
  ["/oem", "OEM supply"],
  ["/manufacturing", "Manufacturing"],
  ["/clients", "Clients"],
  ["/brands", "Brands"],
  ["/about", "About"]
];

export default function Header() {
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link className="logo" href="/">
          <b>{site.short}</b>
          <span>Enterprises<br />Est. {site.founded}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={path?.startsWith(href) ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <a className="wa-btn" href={waLink()} target="_blank" rel="noopener">WhatsApp</a>
        <Link className="btn solid quote" href="/contact">Request a quote <i aria-hidden="true">→</i></Link>
      </div>
    </header>
  );
}
