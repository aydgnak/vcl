import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-border/70 bg-surface shadow-md">
      <div className="h-1.5 w-full bg-linear-to-r from-accent/65 via-accent/30 to-transparent" aria-hidden="true" />

      <div className="p-6 sm:p-7">
        <LoginForm />
      </div>
    </div>
  )
}
