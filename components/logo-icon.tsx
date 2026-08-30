import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...props}
    >
      <rect width="64" height="64" rx="18" fill="#142B4A" />
      <path
        d="M20 14h17.5L46 22.5V50H20V14Z"
        stroke="#F7F8FA"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M37.5 14v9H46" stroke="#F7F8FA" strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M25 30h8.5M25 36h13" stroke="#F7F8FA" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="m25.5 44 4.8 4.3L41 37"
        stroke="#C89B4A"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48.5" cy="44.5" r="4.5" fill="#237A6B" />
      <circle cx="48.5" cy="44.5" r="2" fill="#F7F8FA" />
    </svg>
  );
}
