import { useState, useRef, useCallback } from "react";
import { clampBounds } from "../store/windowStore";
import { LAYOUT } from "../theme/tokens";

export function useWindowDrag({
  windowId,
  bounds,
  isMaximized,
  onUpdateBounds,
  onSnap,
  onFocus,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [snapGhost, setSnapGhost] = useState(null); // null | 'left' | 'right' | 'maximize'

  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, x: 0, y: 0 });
  const resizeStartRef = useRef({
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    direction: "",
  });

  // ── Dragging from Title Bar ──
  const handleTitlePointerDown = useCallback(
    (e) => {
      if (e.button !== 0 || isMaximized) return;
      e.stopPropagation();
      onFocus();

      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);

      setIsDragging(true);
      document.body.classList.add("is-dragging");

      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        x: bounds.x,
        y: bounds.y,
      };
    },
    [bounds, isMaximized, onFocus]
  );

  const handleTitlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.stopPropagation();

      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      const newX = dragStartRef.current.x + dx;
      const newY = dragStartRef.current.y + dy;

      const clamped = clampBounds({
        x: newX,
        y: newY,
        width: bounds.width,
        height: bounds.height,
      });

      onUpdateBounds(windowId, clamped);

      // Edge snapping ghost detection
      const edgeThreshold = 20;
      if (e.clientX <= edgeThreshold) {
        setSnapGhost("left");
      } else if (e.clientX >= window.innerWidth - edgeThreshold) {
        setSnapGhost("right");
      } else if (e.clientY <= LAYOUT.topbarHeight + 10) {
        setSnapGhost("maximize");
      } else {
        setSnapGhost(null);
      }
    },
    [isDragging, bounds, windowId, onUpdateBounds]
  );

  const handleTitlePointerUp = useCallback(
    (e) => {
      if (!isDragging) return;
      setIsDragging(false);
      document.body.classList.remove("is-dragging");

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      if (snapGhost) {
        if (snapGhost === "left" || snapGhost === "right") {
          onSnap(windowId, snapGhost);
        } else if (snapGhost === "maximize") {
          onSnap(windowId, "maximize");
        }
        setSnapGhost(null);
      }
    },
    [isDragging, snapGhost, windowId, onSnap]
  );

  // ── 8-way Resizing ──
  const handleResizePointerDown = useCallback(
    (e, direction) => {
      if (e.button !== 0 || isMaximized) return;
      e.stopPropagation();
      e.preventDefault();
      onFocus();

      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);

      setIsResizing(true);
      document.body.classList.add("is-dragging");

      resizeStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        x: bounds.x,
        y: bounds.y,
        w: bounds.width,
        h: bounds.height,
        direction,
      };
    },
    [bounds, isMaximized, onFocus]
  );

  const handleResizePointerMove = useCallback(
    (e) => {
      if (!isResizing) return;
      e.stopPropagation();

      const { mouseX, mouseY, x, y, w, h, direction } = resizeStartRef.current;
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;

      let newX = x;
      let newY = y;
      let newW = w;
      let newH = h;

      if (direction.includes("e")) newW = w + dx;
      if (direction.includes("s")) newH = h + dy;
      if (direction.includes("w")) {
        newW = w - dx;
        newX = x + dx;
      }
      if (direction.includes("n")) {
        newH = h - dy;
        newY = y + dy;
      }

      // Clamping to minimums
      if (newW < LAYOUT.minWindowWidth) {
        newW = LAYOUT.minWindowWidth;
        if (direction.includes("w")) newX = x + (w - LAYOUT.minWindowWidth);
      }
      if (newH < LAYOUT.minWindowHeight) {
        newH = LAYOUT.minWindowHeight;
        if (direction.includes("n")) newY = y + (h - LAYOUT.minWindowHeight);
      }

      const clamped = clampBounds({
        x: newX,
        y: newY,
        width: newW,
        height: newH,
      });

      onUpdateBounds(windowId, clamped);
    },
    [isResizing, windowId, onUpdateBounds]
  );

  const handleResizePointerUp = useCallback(
    (e) => {
      if (!isResizing) return;
      setIsResizing(false);
      document.body.classList.remove("is-dragging");

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    },
    [isResizing]
  );

  return {
    isDragging,
    isResizing,
    snapGhost,
    titleDragProps: {
      onPointerDown: handleTitlePointerDown,
      onPointerMove: handleTitlePointerMove,
      onPointerUp: handleTitlePointerUp,
    },
    getResizeProps: (direction) => ({
      onPointerDown: (e) => handleResizePointerDown(e, direction),
      onPointerMove: handleResizePointerMove,
      onPointerUp: handleResizePointerUp,
    }),
  };
}
