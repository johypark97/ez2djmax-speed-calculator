import type { Route } from './+types/home';
import Front from '~/front';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'EZ2DJMAX Speed Calculator' },
    {
      name: 'description',
      content:
        'A note speed calculator for DJMAX RESPECT V and EZ2ON REBOOT : R',
    },
  ];
}

export default function Home() {
  return <Front />;
}
