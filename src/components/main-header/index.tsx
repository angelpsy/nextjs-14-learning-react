import { MdPostAdd, MdMessage } from 'react-icons/md';
import { Link } from 'react-router';

import classes from './styles.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <p>
        <Link className={classes.button} to={'/posts/new'}>
          <MdPostAdd size={18} />
          New Post
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;