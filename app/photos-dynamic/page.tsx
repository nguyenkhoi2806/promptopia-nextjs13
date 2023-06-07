import { Alert } from '@components/Flowbite';
import UnsplashImage from '@models/unsplash-image';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Static fetching - Next js 13.4 Image Gallery',
};

const Photos = async () => {
  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  const images: UnsplashImage = await response.json();
  const width = Math.min(500, images.width);
  const height = (width / images.width) * images.height;

  return (
    <div className="d-flex flex-column align-items-center align-middle">
      <Alert className="mb-5">
        This page <strong>fetches data dynamically</strong>
        Every time you refresh the page, you get a new image from Unsplash api.
      </Alert>
      <Image
        src={images.urls.raw}
        width={width}
        height={height}
        alt={images.description}
        className="rounded shadow mw-100 h-100"
      />
      by
      <Link href={'/users-photo/' + images.user.username}>
        {images.user.username}
      </Link>
    </div>
  );
};

export default Photos;
