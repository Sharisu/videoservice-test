import { clsx } from 'clsx';

interface PageBreadcrumbsProps {
  title: string;
  className?: string;
  onLevelUpClick: () => void;
}

export function PageBreadcrumbs({ title, className, onLevelUpClick }: PageBreadcrumbsProps) {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <button
        className="hover:text-accent text-secondary-foreground shrink-0 cursor-pointer"
        onClick={onLevelUpClick}
      >
        Video catalog
      </button>
      <span className="text-gray-400">/</span>
      <span className="text-foreground line-clamp-1 font-semibold">{title}</span>
    </div>
  );
}
