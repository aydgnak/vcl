import { CarFront } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CarTable } from '@/components/car/table'

export default function CarPage() {
  const t = useTranslations('car.list')

  return (
    <section aria-labelledby="car-page-title" className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <header className="flex items-start gap-4 border-b border-border pb-6">
        <span className="flex size-11 shrink-0 items-center justify-center border border-border bg-background text-foreground">
          <CarFront aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl" id="car-page-title">{t('title')}</h1>
          <p className="max-w-xl text-sm text-muted-foreground">{t('description')}</p>
        </div>
      </header>
      <CarTable />
    </section>
  )
}
