import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-[45ch] text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 active:scale-[0.98]"
      >
        Back home
      </Link>
    </div>
  )
}
