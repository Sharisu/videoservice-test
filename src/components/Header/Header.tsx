export function Header() {
  return (
    <header className="flex h-[64px] items-center bg-white shadow-md">
      <div className="container mx-auto flex items-center gap-4 px-4">
        <h1 className="text-3xl font-bold text-gray-900">Video catalog service</h1>
        <button className="hover:text-accent cursor-pointer rounded-md px-4 py-2 text-black">Home</button>
      </div>
    </header>
  );
}
