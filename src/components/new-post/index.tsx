import { useState } from 'react';
import classes from './styles.module.css'

export default function NewPost() {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');

  function handleChangeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(event.target.value);
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <form className={classes.form}>
      <div className={classes.field}>
        <label htmlFor="body">Body</label>
        <textarea id="body" value={body} required rows={3} onChange={handleChangeBody} />
      </div>
      <div className={classes.field}>
        <label htmlFor="name">Author's name</label>
        <input type="text" id="name" value={name} required onChange={handleChangeName}/>
      </div>
    </form>
  )
}
