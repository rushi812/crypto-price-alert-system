import { Property } from "csstype";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { memo } from "react";

const Image: React.FC<ImageProps> = (props) => {
  const { alt, objectFit, objectPosition, fallbackSrc, src, ...restProps } = props;

  const style: React.CSSProperties = { ...restProps.style, objectPosition, objectFit };

  return <NextImage unoptimized style={style} src={src} alt={alt || ""} {...restProps} />;
};

type ImageProps = Pick<
  NextImageProps,
  "src" | "width" | "height" | "fill" | "priority" | "id" | "className" | "style" | "onError"
> & {
  alt?: string;
  objectFit?: Property.ObjectFit;
  objectPosition?: Property.ObjectPosition;
  fallbackSrc?: string;
};

export default memo(Image);
