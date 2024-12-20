import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  ReactNode,
  useCallback,
  useState,
} from 'react';

interface ImageWithFallbackProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  urls: string[];
  fallback?: string;
  placeholderComponent?: ReactNode;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  urls,
  fallback,
  placeholderComponent = <></>,
  alt,
  ...props
}) => {
  const [currentImage, setCurrentImage] = useState(urls[0]); // Start with the first image
  const [index, setIndex] = useState(0); // Track the index of the current image

  const handleError = useCallback(() => {
    if (index < urls.length - 1) {
      setIndex((prevIndex) => prevIndex + 1); // Move to the next image in the array
      setCurrentImage(urls[index + 1]); // Set the new current image
    } else {
      setCurrentImage(fallback || ''); // If all images fail, set to fallback image
    }
  }, [urls, fallback, index]);

  return placeholderComponent && !currentImage ? (
    placeholderComponent
  ) : (
    <img src={currentImage} alt={alt} onError={handleError} {...props} />
  );
};

export default ImageWithFallback;
