import { Link } from 'react-router';
import styles from "./styles.module.css";

type Props = {
  id: number;
  author: string;
  body: string;
  className?: string;
  htmlTag?: React.ElementType;
  isActive?: boolean;
};

export default function Post(props: Props) {
  const classNameOfRoot = styles.root + (props.isActive ? ` ${styles.selected}` : "") + (props.className ? ` ${props.className}` : "");
  const Tag = props.htmlTag || "li";
  return (
    <Tag className={classNameOfRoot}>
      <Link to={`/posts/${props.id}`} className={styles.link}>
        <p className={styles.author}>{props.author}</p>
        <p className={styles.body}>{props.body}</p>
      </Link>
    </Tag>
  );
}
