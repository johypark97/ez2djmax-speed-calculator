import { ComponentPropsWithoutRef } from 'react';

type ExternalLinkProps = ComponentPropsWithoutRef<'a'>;

export default function ExternalLink({
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}
