import styles from './styles.module.css'

type Props = React.PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
};

export default function Modal(props: Props) {
  return (
    <>
      {props.open && <div className={styles.backdrop} onClick={props?.onClose}/>}
      <dialog open={props.open} className={styles.modal}>
        {props.children}
      </dialog>
    </>
  )
}
