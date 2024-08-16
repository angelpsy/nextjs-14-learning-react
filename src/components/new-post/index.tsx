import classes from './styles.module.css'

type Props = {
  id?: number | null;
  body: string;
  name: string;
  onChangeBody: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function NewPost(props: Props) {
  return (
    <form className={classes.form}>
      <div className={classes.field}>
        <label htmlFor="body">Body</label>
        <textarea id="body" value={props.body} required rows={3} onChange={props.onChangeBody} />
      </div>
      <div className={classes.field}>
        <label htmlFor="name">Author's name</label>
        <input type="text" id="name" value={props.name} required onChange={props.onChangeName}/>
      </div>
    </form>
  )
}
