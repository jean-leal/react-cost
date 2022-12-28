import styles from './SubmitButtom.module.css';

function SubmitButtom({ text }){
  return (
    <div>
      <buttom className={styles.btn}>{text}</buttom>
    </div>
  )
}

export default SubmitButtom;