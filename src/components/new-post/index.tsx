import classes from './styles.module.css'

export default function NewPost() {
  return (
    <form className={classes.form}>
      <div className={classes.field}>
        <label htmlFor="body">Body</label>
        <textarea id="body" required rows={3} />
      </div>
      <div className={classes.field}>
        <label htmlFor="name">Author's name</label>
        <input type="text" id="name" required />
      </div>
    </form>
  )
}
