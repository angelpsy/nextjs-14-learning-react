type Props = {
  author: string;
  body: string;
};

export default function Post(props: Props) {
  return (
    <div>
      <p>{props.author}</p>
      <p>{props.body}</p>
    </div>
  );
}
