import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'

import { priceFormatter } from '@/utils/formatter'
import { useSummary } from '@/hooks/useSummary'
import { SummaryCard } from './components/SummaryCard'

export function Summary() {
  const summary = useSummary()

  return (
    <div className="w-full max-w-[1120px] mx-auto px-6 grid grid-cols-3 gap-8 -mt-20">
      <SummaryCard>
        <header className="flex items-center justify-between text-gray-300">
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong className="mt-4 text-2xl">
          {priceFormatter.format(summary.income)}
        </strong>
      </SummaryCard>
      <SummaryCard>
        <header className="flex items-center justify-between text-gray-300">
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong className="mt-4 text-2xl">
          {priceFormatter.format(summary.outcome)}
        </strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header className="flex items-center justify-between text-gray-300">
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong className="mt-4 text-2xl">
          {priceFormatter.format(summary.total)}
        </strong>
      </SummaryCard>
    </div>
  )
}
