import { useId } from 'react'

export type Shape = 'circle' | 'square' | 'triangle' | 'diamond'
export type Fill = 'empty' | 'half' | 'full'
export type Figure = { shape: Shape; fill: Fill }

function outline(shape: Shape) {
  switch (shape) {
    case 'circle':
      return <circle cx="50" cy="50" r="31" />
    case 'square':
      return <rect x="21" y="21" width="58" height="58" />
    case 'triangle':
      return <polygon points="50,15 86,79 14,79" />
    case 'diamond':
      return <polygon points="50,12 88,50 50,88 12,50" />
  }
}

/** 행렬 추론 문항에 쓰는 도형. 채우기는 비움, 왼쪽 절반, 전체 세 가지. */
export function Glyph({ shape, fill, className }: Figure & { className?: string }) {
  const clipId = `half-${useId().replace(/[^\w-]/g, '')}`

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {fill === 'half' && (
        <defs>
          <clipPath id={clipId}>
            <rect width="50" height="100" />
          </clipPath>
        </defs>
      )}
      {fill !== 'empty' && (
        <g fill="currentColor" clipPath={fill === 'half' ? `url(#${clipId})` : undefined}>
          {outline(shape)}
        </g>
      )}
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round">
        {outline(shape)}
      </g>
    </svg>
  )
}
