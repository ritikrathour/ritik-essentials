import { ReactNode, useCallback, useRef } from "react";

interface OverlayProps {
  isOpen: boolean;
  onClose: any;
  closeOnClick: boolean;
  children: ReactNode;
  className?: string;
}
export const OverlayBackdrop: React.FC<OverlayProps> = ({
  isOpen,
  onClose,
  closeOnClick,
  children,
  className = "",
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnClick && e.target === overlayRef.current) {
        onClose();
      }
    },
    [closeOnClick, onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 bg-[rgba(0,0,0,.3)] z-50 flex items-center justify-center h-[100vh] ${className}`}
      onClick={handleClick}
      role="presentation"
    >
      {children}
    </div>
  );
};
