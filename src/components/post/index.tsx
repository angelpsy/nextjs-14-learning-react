import styles from "./styles.module.css";

type Props = {
  id: number;
  author: string;
  body: string;
  className?: string;
  htmlTag?: React.ElementType;
  selected?: boolean;
  onSelect?: (id: number) => void;
};

export default function Post(props: Props) {
  const classNameOfRoot = styles.root + (props.selected ? ` ${styles.selected}` : "") + (props.className ? ` ${props.className}` : "");
  const Tag = props.htmlTag || "li";
  return (
    <Tag className={classNameOfRoot} onClick={() => props.onSelect?.(props.id)}>
      <p className={styles.author}>{props.author}</p>
      <p className={styles.body}>{props.body}</p>
    </Tag>
  );
}
