/**
 * Global Test Setup for Portfolio Application
 *
 * JSDOM (our testing environment) lacks native support for modern browser APIs
 * used for visual effects and responsive behaviors. This file provides minimal
 * mocks to ensure components can be instantiated and tested without runtime errors.
 */

// Mock Canvas API: Required for GeometricBg and AnimatedBg components.
// JSDOM does not implement the 2D rendering context used for background effects.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => ({
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x: any, y: any, w: any, h: any) => ({
      data: new Uint8ClampedArray(w * h * 4),
    }),
    putImageData: () => {},
    createImageData: () => ({ data: new Uint8ClampedArray(4) }),
    setTransform: () => {},
    drawWidget: () => {},
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
    fillText: () => {},
    font: '',
    createRadialGradient: () => ({
      addColorStop: () => {},
    }),
    createLinearGradient: () => ({
      addColorStop: () => {},
    }),
  })) as any;
}

// Mock ResizeObserver: Used for fluid responsive resizing of canvas elements.
// This API is not natively supported in the current JSDOM version.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Mock requestAnimationFrame: Essential for UI thread animations.
// Optimized for the testing event loop using a standard 16ms delay.
if (typeof window !== 'undefined' && !window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return setTimeout(() => callback(Date.now()), 16) as any;
  };
  window.cancelAnimationFrame = (id: any) => {
    clearTimeout(id);
  };
}
