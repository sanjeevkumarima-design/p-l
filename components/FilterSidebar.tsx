'use client'

import { useState } from 'react'

type Props = {
  categories: string[];
  active: string[];
  onChange: (next: string[]) => void;
}

export default function FilterSidebar({ categories, active, onChange }: Props) {
  const [open, setOpen] = useState(true)

  function toggleCategory(cat: string) {
    const next = active.includes(cat) ? active.filter(c => c !== cat) : [...active, cat]
    onChange(next)
  }

  return (
    <aside className="w-full md:w-64">
      <div className="bg-white rounded p-4 shadow-sm">
        <button
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="w-full text-left font-medium flex items-center justify-between"
        >
          <span>Categories</span>
          <span className="ml-2">{open ? '▾' : '▸'}</span>
        </button>

        <div className={open ? 'mt-3' : 'hidden mt-3'}>
          <ul role="list" className="space-y-2">
            {categories.map(cat => (
              <li key={cat}>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="mr-2 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                    aria-checked={active.includes(cat)}
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
