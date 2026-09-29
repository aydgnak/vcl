'use client'

import type { PaginationState, RowData, TableOptions } from '@tanstack/react-table'
import type { DataTableFeatures } from '@/components/data-table/features'
import { FlexRender, useTable } from '@tanstack/react-table'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { features } from '@/components/data-table/features'
import { pageSizeOptions } from '@/components/data-table/pagination'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const loadingRows = ['loading-row-1', 'loading-row-2', 'loading-row-3', 'loading-row-4', 'loading-row-5']

type DataTableProps<TData extends RowData> = Pick<
  TableOptions<DataTableFeatures, TData>,
  'columns' | 'data' | 'getRowId'
> & {
  pageCount: number
  pagination: PaginationState
  error?: boolean
  isLoading?: boolean
  onPaginationChange: NonNullable<TableOptions<DataTableFeatures, TData>['onPaginationChange']>
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  getRowId,
  pageCount,
  pagination,
  error = false,
  isLoading = false,
  onPaginationChange,
}: DataTableProps<TData>) {
  const t = useTranslations('dataTable')
  const table = useTable({
    features,
    columns,
    data,
    getRowId,
    manualPagination: true,
    pageCount,
    state: { pagination },
    onPaginationChange,
  })

  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="border-b border-border p-4">
        <Field className="max-w-sm gap-1.5">
          <Input
            aria-label={t('search.label')}
            onChange={event => table.setGlobalFilter(event.target.value)}
            placeholder={t('search.placeholder')}
            type="search"
            value={String(table.state.globalFilter ?? '')}
          />
          <FieldDescription>{t('search.scope')}</FieldDescription>
        </Field>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow className="bg-muted/40 hover:bg-muted/40" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead className="h-11 px-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground" key={header.id}>
                  {header.isPlaceholder ? null : <FlexRender header={header} />}
                </TableHead>
              ),
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading
            ? loadingRows.map(loadingRow => (
                <TableRow aria-hidden="true" key={loadingRow}>
                  {columns.map(column => (
                    <TableCell className="px-4 py-4" key={`${loadingRow}-${String(column.header)}`}>
                      <Skeleton className="h-4 w-full max-w-36" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : error
              ? (
                  <TableRow>
                    <TableCell className="h-28 px-4 text-center text-sm text-destructive" colSpan={columns.length}>
                      {t('error')}
                    </TableCell>
                  </TableRow>
                )
              : table.getRowModel().rows?.length
                ? (
                    table.getRowModel().rows.map(row => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map(cell => (
                          <TableCell className="px-4 py-3.5" key={cell.id}>
                            <FlexRender cell={cell} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )
                : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-28 px-4 text-center text-sm text-muted-foreground">
                        {t('noResults')}
                      </TableCell>
                    </TableRow>
                  )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <span aria-live="polite" className="text-sm text-muted-foreground">
          {t('pagination.page', {
            current: pageCount === 0 ? 0 : pagination.pageIndex + 1,
            total: pageCount,
          })}
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Select
              onValueChange={(value) => {
                if (value !== null) {
                  onPaginationChange(current => ({
                    ...current,
                    pageIndex: 0,
                    pageSize: Number(value),
                  }))
                }
              }}
              value={String(pagination.pageSize)}
            >
              <SelectTrigger aria-label={t('pagination.pageSize')} className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end" alignItemWithTrigger={false}>
                <SelectGroup>
                  <SelectLabel>{t('pagination.pageSize')}</SelectLabel>
                  {pageSizeOptions.map(pageSize => (
                    <SelectItem key={pageSize} value={String(pageSize)}>{pageSize}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              aria-label={t('pagination.previous')}
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size="icon-sm"
              type="button"
              variant="outline"
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              aria-label={t('pagination.next')}
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              size="icon-sm"
              type="button"
              variant="outline"
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
