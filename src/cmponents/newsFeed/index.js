import { isDay } from '../../utils/dateHandler';
import cn from 'classnames';
import Card from '../card';

import styles from './NewsFeed.module.css';

const NewsFeed = ({allPosts}) => {
 
  return (
        <div className={cn(styles.wrapper, {
          [styles.darkBack]: isDay(),
        })}>
          {
            allPosts && allPosts.map((post) => (
             <Card key={post.puid} post={post} />
            ))
          }
        </div>
    )
};

export default NewsFeed;