'use client'

import type { CarR } from 'shared/types'
import type { DataTableFeatures } from '@/components/data-table/features'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useDataTablePagination } from '@/components/data-table/pagination'
import { DataTable } from '@/components/data-table/table'
import { useCarFindAll } from '@/hooks/car/use-car-find-all'

export function CarTable() {
  const t = useTranslations('car.fields')
  const [pagination, setPagination] = useDataTablePagination()
  const { data, error, isLoading } = useCarFindAll(pagination.pageIndex + 1, pagination.pageSize)

  const cars = data?.data ?? []
  const columnHelper = createColumnHelper<DataTableFeatures, CarR>()
  const columns = columnHelper.columns([
    columnHelper.accessor('plate', {
      header: t('plate'),
      cell: info => (
        <span className="inline-flex min-w-28 items-center justify-center border border-border bg-muted/40 px-2.5 py-1 font-mono text-xs font-semibold tracking-[0.08em]">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('brand', {
      header: t('brand'),
    }),
    columnHelper.accessor('model', {
      header: t('model'),
    }),
    columnHelper.accessor('modelYear', {
      header: t('modelYear'),
    }),
  ])

  return (
    <DataTable
      columns={columns}
      data={cars}
      error={Boolean(error)}
      isLoading={isLoading}
      onPaginationChange={setPagination}
      pageCount={data?.meta.totalPages ?? 0}
      pagination={pagination}
    />
  )
}
