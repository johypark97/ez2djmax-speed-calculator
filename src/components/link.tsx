import { ComponentPropsWithoutRef } from 'react';

export type ExternalLinkProps = Omit<
  ComponentPropsWithoutRef<'a'>,
  'rel' | 'target'
>;

export default function ExternalLink({ ...props }: ExternalLinkProps) {
  return <a rel="noopener noreferrer" target="_blank" {...props} />;
}
