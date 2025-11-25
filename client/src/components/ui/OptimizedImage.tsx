import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ImageSkeleton from "../SkeletonUI/ImageSkeleton";
import { Button } from "./Button";

/**
 * Progressive Image Component with Advanced Optimization
 * Features:
 * - Lazy loading with Intersection Observer
 * - Progressive image loading (LQIP - Low Quality Image Placeholder)
 * - Responsive images with srcset
 * - Error handling and retry mechanism
 * - Skeleton loading state
 * - Memory leak prevention
 * - Performance metrics tracking
 */
type loadState = "idle" | "loading" | "loaded" | "error";
type loadingType = "lazy" | "eager";
interface IOptimizedImage {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  lowQualitySrc?: string;
  srcSet?: string;
  sizes?: string;
  className?: string;
  objectFit?: String;
  loading?: loadingType;
  threshhold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
  retryCount?: number;
  retryDelay?: number;
}
// OptimizedImage
export const OptimizedImage: React.FC<IOptimizedImage> = ({
  src,
  alt,
  width,
  height,
  lowQualitySrc,
  srcSet,
  sizes,
  className = "",
  objectFit = "cover",
  loading = "lazy",
  threshhold = 0.1,
  rootMargin = "50px",
  onLoad,
  onError,
  retryCount = 0,
  retryDelay = 1000,
}: any) => {
  const [loadState, setLoadState] = useState<loadState>("idle");
  const [currentSrc, setCurrentSrc] = useState<string>(lowQualitySrc || "");
  const [isInView, setIsInView] = useState<boolean>(false);
  const [retries, setRetries] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const ObserverRef = useRef<IntersectionObserver | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading !== "lazy") {
      setIsInView(true);
      return;
    }
    const options = {
      threshhold,
      rootMargin,
    };
    ObserverRef.current = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          ObserverRef.current?.disconnect();
        }
      },
      options
    );
    if (imageRef.current) {
      ObserverRef.current?.observe(imageRef?.current);
    }
    return () => {
      ObserverRef.current?.disconnect();
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [loading, threshhold, rootMargin]);

  useEffect(() => {
    setLoadState("idle");
  }, [src]);
  // Image loading logic with retry mechanism
  const loadImage = useCallback(
    (imageSrc: string): void => {
      if (!imageSrc) return;
      setLoadState("loading");
      const img = new Image();
      // Handle successful load
      img.onload = (): void => {
        setLoadState("loaded");
        setCurrentSrc(imageSrc);
        onLoad?.();
      };
      // Handle error with retry logic
      img.onerror = (): void => {
        if (retries < retryCount) {
          retryTimeoutRef.current = setTimeout(() => {
            setRetries((prev) => prev + 1);
            loadImage(imageSrc);
          }, retryDelay * Math.pow(2, retries));
        } else {
          setLoadState("error");
          onError?.();
        }
      };
      // Set srcset if provided for responsive images
      if (srcSet) {
        img.srcset = srcSet;
      }
      if (sizes) {
        img.sizes = sizes;
      }
      img.src = imageSrc;
    },
    [
      retries,
      retryCount,
      retryDelay,
      onLoad,
      onError,
      srcSet,
      sizes,
      width,
      height,
      src,
    ]
  );
  // Trigger image load when in view
  useEffect(() => {
    if (isInView && src && loadState === "idle") {
      loadImage(src);
    }
  }, [isInView, loadState, loadImage]);
  //   manual retry handler
  const handleRetry = () => {
    setRetries(0);
    setLoadState("idle");
    loadImage(src);
  };
  const containerStyle: CSSProperties = {
    width,
    height,
  };
  const imageStyle: CSSProperties = {
    objectFit: objectFit,
    opacity: loadState === "loaded" ? 1 : 0,
  };
  return (
    <>
      <div
        ref={imageRef}
        className={`relative overflow-hidden w-full h-full ${className}`}
        style={containerStyle}
      >
        {/* Skeleton Loader */}
        {(loadState === "idle" || loadState === "loading") && <ImageSkeleton />}
        {/* Low Quality Placeholder (Blurred) */}
        {lowQualitySrc && loadState === "loading" && (
          <img
            src={lowQualitySrc}
            alt={alt}
            style={{ objectFit }}
            aria-hidden="true"
          />
        )}
        {/* Main Image */}
        {currentSrc && loadState === "loaded" && (
          <img
            src={currentSrc}
            className="w-full h-full transition-opacity duration-300 "
            alt={alt}
            sizes={sizes}
            srcSet={srcSet}
            style={imageStyle}
            loading={loading}
          />
        )}
        {/* Error State */}
        {loadState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-600 p-4">
            <svg
              className="w-12 h-12 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm mb-2">Failed to load image</p>

            <Button
              className="w-[140px]"
              onClick={handleRetry}
              variant="primary"
              type="button"
            >
              Retry{" "}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
