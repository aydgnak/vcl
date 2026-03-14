import { getDictionary, resolveRequestLocale } from '@/i18n/dictionaries'
import { translate } from '@/i18n/messages'

export default async function RootPage() {
  const locale = await resolveRequestLocale()
  const messages = await getDictionary(locale)

  return (
    <main className="min-h-[calc(100dvh-4rem)] px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-6xl rounded-lg border border-border/70 bg-surface p-6">
        <h1 className="text-lg font-semibold text-foreground">
          {translate(messages, 'home.title')}
        </h1>

        <p className="mt-2 text-sm text-foreground/70">
          {translate(messages, 'home.description')}
        </p>
      </div>
    </main>
  )
}
