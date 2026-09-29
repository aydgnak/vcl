import type { PaginationState, Updater } from '@tanstack/react-table'
import { useState, useSyncExternalStore } from 'react'

const pageSizeStorageKey = 'data-table-page-size'
const pageSizeChangedEvent = 'data-table-page-size-change'

export const pageSizeOptions = [10, 20, 50, 100]

function getStoredPageSize() {
  const storedPageSize = window.localStorage.getItem(pageSizeStorageKey)
  const pageSize = Number(storedPageSize)

  return pageSizeOptions.includes(pageSize) ? pageSize : 20
}

function subscribeToPageSize(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(pageSizeChangedEvent, callback)

  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(pageSizeChangedEvent, callback)
  }
}

function savePageSize(pageSize: number) {
  window.localStorage.setItem(pageSizeStorageKey, String(pageSize))
  window.dispatchEvent(new Event(pageSizeChangedEvent))
}

export function useDataTablePagination() {
  const pageSize = useSyncExternalStore(subscribeToPageSize, getStoredPageSize, () => 20)
  const [pageIndex, setPageIndex] = useState(0)
  const pagination: PaginationState = { pageIndex, pageSize }

  function setPagination(updater: Updater<PaginationState>) {
    const nextPagination = typeof updater === 'function' ? updater(pagination) : updater

    setPageIndex(nextPagination.pageIndex)

    if (nextPagination.pageSize !== pageSize) {
      savePageSize(nextPagination.pageSize)
    }
  }

  return [pagination, setPagination] as const
}
