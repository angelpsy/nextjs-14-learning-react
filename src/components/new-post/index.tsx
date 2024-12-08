import { useEffect } from 'react';
import { useForm } from './hooks';
import classes from './styles.module.css'
import { IPost } from '../../types/posts';

type Props = {
  id?: number | null;
  defaultBody: string;
  defaultName: string;
  onCancel: () => void;
  onSubmit: (data: {id: number | null, body: string, author: string}) => void;
};

export default function NewPost(props: Props) {
  const {
    body,
    name,
    handleChangeBody,
    handleChangeName,
    handleReset,
  } = useForm({defaultBody: props.defaultBody, defaultName: props.defaultName});

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const id = props.id;
    if (!body || !name) {
      return;
    }
    props.onSubmit({ id: id || null, author: name, body });
    handleReset();
  };

  const handleCancel = () => {
    handleReset();
    props.onCancel();
  };

  return (
    <form onSubmit={handlerSubmit} className={classes.form}>
      <div className={classes.field}>
        <label htmlFor="body">Body</label>
        <textarea id="body" value={body} required rows={3} onChange={handleChangeBody} />
      </div>
      <div className={classes.field}>
        <label htmlFor="name">Author's name</label>
        <input type="text" id="name" value={name} required onChange={handleChangeName}/>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
