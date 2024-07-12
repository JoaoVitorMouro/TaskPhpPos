interface SummaryCardProps {
  variant?: 'green'
  children: React.ReactNode
}

export function SummaryCard({ variant, children }: SummaryCardProps) {
  return (
    <div
      className={`p-8 rounded-md ${variant === 'green' ? 'bg-green-700' : 'bg-gray-600'}`}
    >
      {children}
    </div>
  )
}
