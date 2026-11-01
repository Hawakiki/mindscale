import type { ReactNode } from 'react'
import styles from './PrimaryButton.module.css'

type Props = {
  onClick: () => void
  size?: 'md' | 'lg'
  children: ReactNode
}

export function PrimaryButton({ onClick, size = 'lg', children }: Props) {
  return (
    <button type="button" className={`${styles.button} ${styles[size]}`} onClick={onClick}>
      {children}
    </button>
  )
}
