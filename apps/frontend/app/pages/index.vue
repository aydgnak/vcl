<script setup lang="ts">
type ExpenseCategory = 'fuel' | 'maintenance' | 'insurance' | 'parking'

interface MonthlyPoint {
  month: string
  total: number
}

interface ExpenseItem {
  id: number
  date: string
  vehicle: string
  category: ExpenseCategory
  amount: number
  note: string
}

interface VehicleSummary {
  id: number
  name: string
  plate: string
  monthlyCost: number
  costPerKm: number
  lastServiceAt: string
}

interface ReminderItem {
  id: number
  title: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

const { t, locale } = useI18n()
const { user } = useAuth()

const monthlySeries: MonthlyPoint[] = [
  { month: 'dashboard.months.jan', total: 12100 },
  { month: 'dashboard.months.feb', total: 11500 },
  { month: 'dashboard.months.mar', total: 13800 },
  { month: 'dashboard.months.apr', total: 12800 },
  { month: 'dashboard.months.may', total: 14900 },
  { month: 'dashboard.months.jun', total: 15600 },
]

const expenses: ExpenseItem[] = [
  { id: 1, date: '06 Mar 2026', vehicle: 'Renault Clio', category: 'fuel', amount: 1450, note: 'Shell V-Power 95' },
  { id: 2, date: '04 Mar 2026', vehicle: 'Renault Clio', category: 'parking', amount: 180, note: 'Kadikoy parking' },
  { id: 3, date: '02 Mar 2026', vehicle: 'Volkswagen Caddy', category: 'maintenance', amount: 3200, note: 'Oil + filters' },
  { id: 4, date: '28 Feb 2026', vehicle: 'Volkswagen Caddy', category: 'fuel', amount: 2100, note: 'Long route refill' },
  { id: 5, date: '24 Feb 2026', vehicle: 'Renault Clio', category: 'insurance', amount: 4100, note: 'Quarterly installment' },
]

const vehicles: VehicleSummary[] = [
  { id: 1, name: 'Renault Clio', plate: '34 ABC 123', monthlyCost: 7800, costPerKm: 3.7, lastServiceAt: '12 Jan 2026' },
  { id: 2, name: 'Volkswagen Caddy', plate: '34 XYZ 987', monthlyCost: 8600, costPerKm: 4.4, lastServiceAt: '02 Mar 2026' },
]

const reminders: ReminderItem[] = [
  { id: 1, title: 'dashboard.reminders.items.oil', dueDate: '15 Mar 2026', priority: 'high' },
  { id: 2, title: 'dashboard.reminders.items.insurance', dueDate: '28 Mar 2026', priority: 'medium' },
  { id: 3, title: 'dashboard.reminders.items.inspection', dueDate: '07 Apr 2026', priority: 'low' },
]

const latestMonthTotal = computed(() => monthlySeries.at(-1)?.total ?? 0)
const previousMonthTotal = computed(() => monthlySeries.at(-2)?.total ?? 0)
const averageMonthlyCost = computed(() => {
  if (monthlySeries.length === 0) {
    return 0
  }

  const total = monthlySeries.reduce((sum, item) => sum + item.total, 0)
  return Math.round(total / monthlySeries.length)
})

const monthChange = computed(() => {
  if (previousMonthTotal.value === 0) {
    return 0
  }

  return Math.round(((latestMonthTotal.value - previousMonthTotal.value) / previousMonthTotal.value) * 100)
})

const categoryTotals = computed(() => {
  return expenses.reduce<Record<ExpenseCategory, number>>((result, item) => {
    result[item.category] += item.amount
    return result
  }, {
    fuel: 0,
    maintenance: 0,
    insurance: 0,
    parking: 0,
  })
})

const chartMax = computed(() => Math.max(...monthlySeries.map(item => item.total), 1))

function getBarHeight(total: number) {
  return `${Math.round((total / chartMax.value) * 100)}%`
}

function getTrendBarClass(index: number) {
  const current = monthlySeries[index]?.total ?? 0
  const previous = monthlySeries[index - 1]?.total ?? current

  if (index === monthlySeries.length - 1) {
    return 'from-fuchsia-500 via-cyan-400 to-emerald-300 shadow-[0_0_18px_rgba(56,189,248,0.35)]'
  }

  if (current >= previous) {
    return 'from-emerald-500 to-cyan-400'
  }

  return 'from-amber-500 to-rose-400'
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(value)
}

function reminderVariant(priority: ReminderItem['priority']) {
  if (priority === 'high') {
    return 'bg-red-500/12 text-red-700 border-red-300/70 dark:bg-red-500/15 dark:text-red-300 dark:border-red-400/30'
  }

  if (priority === 'medium') {
    return 'bg-amber-500/12 text-amber-700 border-amber-300/70 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-400/30'
  }

  return 'bg-emerald-500/12 text-emerald-700 border-emerald-300/70 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-400/30'
}
</script>

<template>
  <div class="relative min-h-full overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div class="relative mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
      <section class="rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5 md:p-7">
        <p class="text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          {{ t('dashboard.kicker') }}
        </p>
        <div class="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-white md:text-3xl">
              {{ t('dashboard.welcome', { email: user?.email || '-' }) }}
            </h1>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {{ t('dashboard.subtitle') }}
            </p>
          </div>

          <div class="inline-flex items-center rounded-xl border border-cyan-300/60 bg-cyan-100/70 px-3 py-2 text-sm text-cyan-800 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-100">
            {{ t('dashboard.currentMonth') }}: {{ formatCurrency(latestMonthTotal) }}
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-white/10 dark:bg-slate-900/70">
          <p class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {{ t('dashboard.cards.totalCost') }}
          </p>
          <p class="mt-3 text-2xl font-semibold">
            {{ formatCurrency(latestMonthTotal) }}
          </p>
          <p class="mt-2 text-xs" :class="monthChange >= 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'">
            {{ monthChange >= 0 ? '+' : '' }}{{ monthChange }}% {{ t('dashboard.cards.vsPrevious') }}
          </p>
        </article>

        <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-white/10 dark:bg-slate-900/70">
          <p class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {{ t('dashboard.cards.fuel') }}
          </p>
          <p class="mt-3 text-2xl font-semibold">
            {{ formatCurrency(categoryTotals.fuel) }}
          </p>
          <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {{ t('dashboard.cards.samplePeriod') }}
          </p>
        </article>

        <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-white/10 dark:bg-slate-900/70">
          <p class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {{ t('dashboard.cards.maintenance') }}
          </p>
          <p class="mt-3 text-2xl font-semibold">
            {{ formatCurrency(categoryTotals.maintenance) }}
          </p>
          <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {{ t('dashboard.cards.samplePeriod') }}
          </p>
        </article>

        <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-white/10 dark:bg-slate-900/70">
          <p class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {{ t('dashboard.cards.average') }}
          </p>
          <p class="mt-3 text-2xl font-semibold">
            {{ formatCurrency(averageMonthlyCost) }}
          </p>
          <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {{ t('dashboard.cards.lastSixMonths') }}
          </p>
        </article>
      </section>

      <section class="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-white/10 dark:bg-slate-900/70 xl:col-span-2">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">
              {{ t('dashboard.trend.title') }}
            </h2>
            <span class="text-xs text-slate-500 dark:text-slate-400">{{ t('dashboard.trend.lastSixMonths') }}</span>
          </div>

          <div class="mt-5 grid grid-cols-6 gap-3">
            <div
              v-for="(point, index) in monthlySeries"
              :key="point.month"
              class="group flex h-48 flex-col items-center justify-end gap-2"
            >
              <div
                class="w-full rounded-t-md bg-gradient-to-t transition-all duration-300 group-hover:brightness-110"
                :class="getTrendBarClass(index)"
                :style="{ height: getBarHeight(point.total) }"
              />
              <p class="text-xs text-slate-600 dark:text-slate-300">
                {{ t(point.month) }}
              </p>
            </div>
          </div>
        </article>

        <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-white/10 dark:bg-slate-900/70">
          <h2 class="text-lg font-semibold">
            {{ t('dashboard.reminders.title') }}
          </h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ t('dashboard.reminders.subtitle') }}
          </p>

          <div class="mt-4 space-y-3">
            <div
              v-for="item in reminders"
              :key="item.id"
              class="rounded-xl border p-3"
              :class="reminderVariant(item.priority)"
            >
              <p class="text-sm font-medium">
                {{ t(item.title) }}
              </p>
              <p class="mt-1 text-xs opacity-80">
                {{ item.dueDate }}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section class="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-white/10 dark:bg-slate-900/70 xl:col-span-2">
          <h2 class="text-lg font-semibold">
            {{ t('dashboard.expenses.title') }}
          </h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ t('dashboard.expenses.subtitle') }}
          </p>

          <div class="mt-4 space-y-2">
            <div
              v-for="item in expenses"
              :key="item.id"
              class="grid grid-cols-1 gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-3 text-sm dark:border-white/10 dark:bg-white/[0.03] md:grid-cols-5 md:items-center"
            >
              <p class="text-slate-600 dark:text-slate-300">
                {{ item.date }}
              </p>
              <p class="font-medium text-slate-900 dark:text-white">
                {{ item.vehicle }}
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                {{ t(`dashboard.categories.${item.category}`) }}
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                {{ item.note }}
              </p>
              <p class="text-right font-semibold text-cyan-700 dark:text-cyan-200">
                {{ formatCurrency(item.amount) }}
              </p>
            </div>
          </div>
        </article>

        <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-white/10 dark:bg-slate-900/70">
          <h2 class="text-lg font-semibold">
            {{ t('dashboard.vehicles.title') }}
          </h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ t('dashboard.vehicles.subtitle') }}
          </p>

          <div class="mt-4 space-y-3">
            <div
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              class="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="font-medium text-slate-900 dark:text-white">
                    {{ vehicle.name }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    {{ vehicle.plate }}
                  </p>
                </div>
                <p class="text-sm font-semibold text-cyan-700 dark:text-cyan-200">
                  {{ formatCurrency(vehicle.monthlyCost) }}
                </p>
              </div>

              <div class="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <p>{{ t('dashboard.vehicles.costPerKm') }}: <span class="text-slate-900 dark:text-white">{{ vehicle.costPerKm }} TL</span></p>
                <p>{{ t('dashboard.vehicles.lastService') }}: <span class="text-slate-900 dark:text-white">{{ vehicle.lastServiceAt }}</span></p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>
