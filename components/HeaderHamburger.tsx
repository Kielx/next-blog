import styles from './headerHamburger.module.css'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const HeaderHamburger: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <button
      type="button"
      aria-label="Open hamburger menu"
      onClick={() => setOpen(!open)}
      className={`${styles.hamburger} ml-auto cursor-pointer pr-6 text-right text-2xl font-bold text-white`}
    >
      <div id={styles.navIcon1} className={`${open ? styles.open : ''}`}>
        <span />
        <span />
        <span />
      </div>
    </button>
  )
}

export default HeaderHamburger
