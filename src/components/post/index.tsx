import styles from "./styles.module.css";

type Props = {
  author: string;
  body: string;
  className?: string;
  htmlTag?: React.ElementType;
};

export default function Post(props: Props) {
  const classNameOfRoot = props.className ? `${styles.root} ${props.className}` : styles.card;
  const Tag = props.htmlTag || "li";
  return (
    <Tag className={classNameOfRoot}>
      <p className={styles.author}>{props.author}</p>
      <p className={styles.body}>{props.body}</p>
    </Tag>
  );
}
