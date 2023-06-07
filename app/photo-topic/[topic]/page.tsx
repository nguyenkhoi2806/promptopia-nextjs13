import UnsplashImage from '@models/unsplash-image';
import Image from 'next/image';

import styles from './topic-detail.module.scss';

interface TopicDetailProps {
  params: {
    topic: string;
  };
}

async function TopicDetail({ params: { topic } }: TopicDetailProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}
     &query=${topic}&count=30`
  );

  const images: UnsplashImage[] = await response.json();
  console.log(images);
  return (
    <div>
      <h1>{topic}</h1>
      {/* {images.map((image) => (
        <Image
          className={styles['image']}
          src={image.urls.raw}
          width={250}
          height={250}
          key={image.urls.raw}
          alt={image.description}
        />
      ))} */}
    </div>
  );
}

export default TopicDetail;
