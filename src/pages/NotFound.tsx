import { Link } from 'react-router';

import { buttonVariants } from '../components/ui/button-variants';
import { cn } from '../components/ui/utils';

export function NotFoundPage(): React.JSX.Element {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-(--bolt-action-strong)">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-(--bolt-ink)">Lost in the server</h1>
      <p className="mt-2 text-(--bolt-muted)">That page does not exist. The registry has all 44 commands though.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className={cn(buttonVariants({ variant: 'primary' }))}>
          Home
        </Link>
        <Link to="/commands" className={cn(buttonVariants({ variant: 'secondary' }))}>
          Commands
        </Link>
      </div>
    </div>
  );
}
