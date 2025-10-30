import { RefreshCwIcon } from 'lucide-react';

type Props = {
  title: string;
  description?: string;
} & (
  | {
      onButtonClick: () => void;
      buttonText?: string;
    }
  | {
      onButtonClick?: never;
      buttonText?: never;
    }
);

export function VideoEmptyState({ title, description, buttonText, onButtonClick }: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-2">
          <p className="text-secondary-foreground text-md">{title || 'Something went wrong'}</p>
        </div>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {onButtonClick && (
        <button
          className="group hover:text-accent bg-muted flex cursor-pointer flex-row items-center gap-2 rounded-md px-4 py-2 text-black"
          onClick={onButtonClick}
        >
          <span className="group-hover:text-accent text-foreground">{buttonText || 'Refresh'}</span>
          <RefreshCwIcon className="text-foreground group-hover:text-accent h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
        </button>
      )}
    </div>
  );
}
