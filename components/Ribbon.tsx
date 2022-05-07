import React from 'react'
import styles from './ribbon.module.css'

type Props = {
  ribbonIcon: string
  ribbonColor: string
}

const Ribbon = ({ ribbonColor, ribbonIcon }: Props) => {
  return (
    <div className={`${styles.ribbon} ${styles.down}`}>
      <div
        className={`${styles.content}`}
        style={{
          background: `${ribbonColor} linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.25) 100%)`,
        }}
      >
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: ribbonIcon }} />
      </div>
    </div>
  )
}

export default Ribbon
