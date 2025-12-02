import { useEffect, useRef } from "react";
// =====================================================
// TYPES & INTERFACES
// =====================================================
interface OverlayManagerOptions {
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  preventScroll?: boolean;
}
interface OverlayManagerReturn {
  closeOnOutsideClick: boolean;
}
// =====================================================
// CORE OVERLAY MANAGER HOOK
// =====================================================
const useOverlayManager = (
  isOpen: boolean,
  onClose: () => void,
  options: OverlayManagerOptions = {}
): OverlayManagerReturn => {
  const {
    closeOnEscape = true,
    closeOnOutsideClick = true,
    preventScroll = true,
  } = options;
  // Scroll lock effect
  useEffect(() => {
    if (!isOpen || !preventScroll) return;
    const originalOverflow = document.body.style.overflow;
    // Lock scroll and compensate for scrollbar
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, preventScroll]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  return { closeOnOutsideClick };
};
export default useOverlayManager;
