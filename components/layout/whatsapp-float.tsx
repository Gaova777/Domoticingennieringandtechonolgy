import { waLink } from '@/lib/constants';

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91a9.84 9.84 0 0 0-2.9-7.01zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.22 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23a7.5 7.5 0 0 1-1.38-1.72c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.41.06-.62.31s-.82.8-.82 1.95.84 2.27.96 2.43c.12.16 1.66 2.53 4.02 3.55.56.24 1 .39 1.34.5.56.18 1.08.15 1.48.09.45-.07 1.39-.57 1.59-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

export function WhatsappFloat() {
  return (
    <a
      href={waLink('Hola 👋, me interesa un producto/servicio de Domotic E Ingeniería.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-brand-green opacity-60 blur-md transition group-hover:opacity-80"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-background shadow-lg shadow-brand-green/30 ring-1 ring-white/20 transition group-hover:scale-105">
        <WhatsappIcon className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-green ring-2 ring-background" />
        </span>
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100 md:block">
        Hablemos por WhatsApp
      </span>
    </a>
  );
}
