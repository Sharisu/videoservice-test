interface PageBreadcrumbsProps {
  title: string;
  onLevelUpClick: () => void;
}

export function PageBreadcrumbs({ title, onLevelUpClick }: PageBreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="hover:text-accent shrink-0 cursor-pointer"
        onClick={onLevelUpClick}
      >
        Video catalog
      </button>
      <span className="text-gray-400">/</span>
      <span className="line-clamp-1 font-semibold text-gray-900">{title}</span>
    </div>
  );
}
