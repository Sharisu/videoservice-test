## Getting Started

First, run the development server:

```bash
pnpm install && pnpm dev
```

or

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tests

```bash
pnpm lint
pnpm test
pnpm test:coverage
```

## Implementation Notes

- **SSR for Home**: The home page uses server-side rendering to prefetch video data and include it in the initial HTML.
- **Styling**: Tailwind CSS with a neutral palette and a single accent color; basic light/dark modes supported.
- **Testing**: Intentional minimal coverage to avoid overengineering for the task scope.
- **Error Emulation**: The API can simulate errors. A simple UI toggle changes error modes to test error boundaries.
- **Dependencies**: Intentionally few third‑party libraries to keep the solution lightweight and transparent.
- **Search Debounce**: 500ms debounce on the search field to reduce unnecessary requests.
- **Details Page**: A simple details page is provided to demonstrate navigation and layout.

## Possible Improvements

- **Virtualization** for large video lists.
- **Infinite scrolling** with pagination.
- **Advanced filters and sorting** (e.g., author, date ranges, sort by views/duration).
- **Keyboard shortcuts** for improved accessibility and navigation.
