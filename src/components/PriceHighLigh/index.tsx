interface PriceHighLightProps {
  variant: 'income' | 'outcome'
  price: string
}

export function PriceHighLight({ variant, price }: PriceHighLightProps) {
  return (
    <span className={variant === 'income' ? 'text-green-300' : 'text-red-300'}>
      {price}
    </span>
  )
}
