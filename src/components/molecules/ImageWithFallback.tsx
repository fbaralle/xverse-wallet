import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  ReactNode,
  useCallback,
  useState,
} from "react";

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
  const [currentImage, setCurrentImage] = useState(urls[0]);
  const [index, setIndex] = useState(0);

  const handleError = useCallback(() => {
    if (index < urls.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setCurrentImage(urls[index + 1]);
    } else {
      setCurrentImage(fallback || "");
    }
  }, [urls, fallback, index]);

  return placeholderComponent && !currentImage ? (
    placeholderComponent
  ) : (
    <img src={currentImage} alt={alt} onError={handleError} {...props} />
  );
};

export default ImageWithFallback;
