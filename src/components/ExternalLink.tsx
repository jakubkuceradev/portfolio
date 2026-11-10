import type { ReactNode } from 'react';

/** External links open in a new tab and say so to screen readers. */
export function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href.startsWith('mailto:')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
