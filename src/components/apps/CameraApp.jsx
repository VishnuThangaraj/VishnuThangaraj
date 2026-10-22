import React, { useState, useEffect, useRef } from 'react';

/**
 * Native Camera Application
 * Pixel-precise reproduction of reference/camera.png
 * Captures front-facing camera by default via WebRTC with robust error fallbacks,
 * authentic camera-off fallback icon, and interactive shutter controls.
 */
const CameraApp = () => {
  const [stream, setStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // Front camera by default
  const [isFlashing, setIsFlashing] = useState(false);
  const videoRef = useRef(null);

  // Initialize and attach camera stream
  useEffect(() => {
    let activeStream = null;
    let isCancelled = false;

    const startCamera = async () => {
      if (!navigator?.mediaDevices?.getUserMedia) {
        setIsCameraActive(false);
        return;
      }

      // Try front-facing camera with ideal constraints
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (isCancelled) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        activeStream = mediaStream;
        setStream(mediaStream);
        setIsCameraActive(true);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            try {
              const p = videoRef.current?.play();
              if (p && typeof p.catch === 'function') p.catch(() => {});
            } catch {}
          };
        }
      } catch (primaryErr) {
        // Fallback to default camera input if exact constraints fail
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });

          if (isCancelled) {
            fallbackStream.getTracks().forEach((track) => track.stop());
            return;
          }

          activeStream = fallbackStream;
          setStream(fallbackStream);
          setIsCameraActive(true);

          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.onloadedmetadata = () => {
              try {
                const p = videoRef.current?.play();
                if (p && typeof p.catch === 'function') p.catch(() => {});
              } catch {}
            };
          }
        } catch (fallbackErr) {
          console.warn('Camera access unavailable:', fallbackErr?.message || fallbackErr);
          setIsCameraActive(false);
        }
      }
    };

    startCamera();

    // Cleanup: Stop all camera tracks when unmounting or switching modes
    return () => {
      isCancelled = true;
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [facingMode]);

  // Ensure video element receives stream whenever stream or ref is updated
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      try {
        const p = videoRef.current.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch {}
    }
  }, [stream]);

  // Flip camera / toggle front and rear
  const handleFlipCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Trigger shutter click feedback
  const handleShutterClick = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 160);
  };

  return (
    <div
      className="macos-camera-app"
      data-testid="camera-app"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#282829',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Upper Section: Camera Viewport */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#282829',
          overflow: 'hidden',
        }}
      >
        {/* Permanent Video Element attached to ref */}
        <video
          ref={videoRef}
          data-testid="camera-video-feed"
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
            display: isCameraActive ? 'block' : 'none',
          }}
        />

        {/* Exact Camera Disabled / Off Placeholder matching reference/camera.png */}
        {!isCameraActive && (
          <div
            data-testid="camera-off-placeholder"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              style={{ width: '84px', height: '84px' }}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Camera Disabled Icon"
            >
              {/* Camera Body */}
              <path d="M26 36 L34 26 L66 26 L74 36 L86 36 C89.3 36 92 38.7 92 42 L92 74 C92 77.3 89.3 80 86 80 L22 80 C18.7 80 16 77.3 16 74 L16 42 C16 38.7 18.7 36 22 36 Z" />
              {/* Center Lens */}
              <circle cx="50" cy="56" r="16" />
              {/* Diagonal Slash Across Camera */}
              <line x1="12" y1="88" x2="88" y2="12" stroke="#ffffff" strokeWidth="5" />
            </svg>
          </div>
        )}

        {/* Shutter Flash Animation Overlay */}
        {isFlashing && (
          <div
            data-testid="camera-flash-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              opacity: 0.85,
              pointerEvents: 'none',
              transition: 'opacity 0.15s ease-out',
            }}
          />
        )}
      </div>

      {/* Lower Section: Bottom Controls Bar */}
      <div
        className="macos-camera-controls"
        data-testid="camera-controls-bar"
        style={{
          height: '74px',
          backgroundColor: '#141414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 36px',
          flexShrink: 0,
        }}
      >
        {/* Left: Gallery / Photos Button */}
        <button
          type="button"
          data-testid="camera-gallery-btn"
          aria-label="Open Photos Gallery"
          title="Gallery"
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>

        {/* Center: Large Circular Shutter Button */}
        <button
          type="button"
          data-testid="camera-shutter-btn"
          onClick={handleShutterClick}
          aria-label="Take Photo"
          title="Take Photo"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            border: '3.5px solid #ffffff',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
            transform: isFlashing ? 'scale(0.94)' : 'scale(1)',
            transition: 'transform 0.1s ease',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
            }}
          />
        </button>

        {/* Right: Camera Flip / Switch Button */}
        <button
          type="button"
          data-testid="camera-flip-btn"
          onClick={handleFlipCamera}
          aria-label="Switch Camera"
          title="Switch Camera"
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CameraApp;
