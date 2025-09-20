'use client'

import { useMemo } from 'react'

export default function Pagination({ page, setPage, total, perPage }: { page: number; setPage: (n:number)=>void; total: number; perPage: number }) {
  const pages = useMemo(() => {
    const p = Math.ceil(total / perPage)
    return Array.from({length: p}, (_, i) => i + 1)
  }, [total, perPage])

  if (pages.length <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex items-center space-x-2 mt-6">
      <button onClick={()=> setPage(Math.max(1, page-1))} disabled={page === 1} className="px-3 py-1 rounded border disabled:opacity-50">
        Prev
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => setPage(p)} aria-current={p===page ? 'page' : undefined} className={`px-3 py-1 rounded border ${p===page ? 'bg-indigo-600 text-white' : ''}`}>
          {p}
        </button>
      ))}
      <button onClick={()=> setPage(Math.min(pages.length, page+1))} disabled={page === pages.length} className="px-3 py-1 rounded border disabled:opacity-50">
        Next
      </button>
    </nav>
  )
}
