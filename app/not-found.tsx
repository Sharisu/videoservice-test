import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto flex max-w-md flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-8xl font-bold text-gray-300">404</div>
          <h1 className="text-2xl font-semibold text-gray-800">Page not found</h1>
        </div>
        <Link
          href="/"
          className="bg-accent hover:bg-accent/80 focus:ring-accent/50 inline-flex cursor-pointer items-center gap-2 rounded-full p-3 font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Return to home
        </Link>
      </div>
    </div>
  );
}
