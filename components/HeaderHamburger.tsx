import styles from '../styles/header.module.css'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const HeaderHamburger: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`${styles.hamburger} ml-auto text-right cursor-pointer font-bold text-white text-2xl pr-6`}
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
