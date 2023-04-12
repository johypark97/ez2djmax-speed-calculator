import Link from 'next/link';
import { PropsWithChildren } from 'react';

type ExternalLinkProps = {
  href: string;
} & PropsWithChildren;

export const ExternalLink = ({ children, href }: ExternalLinkProps) => (
  <Link
    className="px-2 text-blue-500 hover:underline"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </Link>
);
