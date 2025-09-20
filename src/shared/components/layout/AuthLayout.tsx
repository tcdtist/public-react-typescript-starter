interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: React.ReactNode
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-6 text-foreground sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
          </div>
          <div className="animate-slide-up rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
