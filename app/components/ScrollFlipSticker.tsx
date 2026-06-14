'use client';

import { useRef, useEffect, useId } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import type { UseScrollOptions } from 'framer-motion';

interface Props {
  src: string;
  alt?: string;
  /** Rendered image width in px — also controls filter light positions */
  size?: number;
  position: React.CSSProperties;
  /** Z-rotation of the whole sticker (tilt it naturally) */
  rotate?: number;
  /** Which edge the peel curls from — 0=top, 90=right, 180=bottom, 270=left */
  peelDirection?: number;
  offset?: [string, string];
  className?: string;
}

export default function ScrollFlipSticker({
  src,
  alt = 'sticker',
  size = 200,
  position,
  rotate = 0,
  peelDirection = 0,
  offset = ['start end', 'center 60%'],
  className = '',
}: Props) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  // unique filter IDs per instance
  const uid = useId().replace(/:/g, 'x');

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: offset as UseScrollOptions['offset'],
  });

  // peel-amount: 1 = fully peeled off (flap visible, sticker invisible)
  //              0 = fully stuck flat
  const rawPeel = useTransform(scrollYProgress, [0, 1], [0.95, 0]);
  const peel    = useSpring(rawPeel, { stiffness: 48, damping: 16 });

  // Push the CSS variable directly onto the sticker container on every frame
  useEffect(() => {
    return peel.on('change', (v) => {
      if (stickerRef.current) {
        stickerRef.current.style.setProperty('--peel-amount', String(v));
      }
    });
  }, [peel]);

  // Light x/y positions proportional to image size
  const lx = size * 0.56;
  const ly = size * 0.72;
  const lyF = size * 0.94;

  return (
    <div
      ref={outerRef}
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ ...position, zIndex: 10 }}
    >
      {/* Per-instance SVG filters so multiple stickers don't collide */}
      <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
        <defs>
          <filter id={`${uid}-pl`}>
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting result="spec" in="blur" specularExponent="100" specularConstant="0.1" lightingColor="white">
              <fePointLight x={lx} y={ly} z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id={`${uid}-plf`}>
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting result="spec" in="blur" specularExponent="100" specularConstant="0.7" lightingColor="white">
              <fePointLight x={lx} y={lyF} z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id={`${uid}-ds`}>
            <feDropShadow dx="2" dy="4" stdDeviation="1.8" floodColor="black" floodOpacity="0.6" />
          </filter>
          <filter id={`${uid}-ef`}>
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      {/*
        The outer div carries all the CSS variables that drive the peel.
        --peel-amount is updated by the framer-motion spring on every frame.
      */}
      <div
        ref={stickerRef}
        style={{
          '--sticker-rotate':          `${rotate}deg`,
          '--sticker-p':               '20%',
          '--sticker-shadow-opacity':  '0.6',
          '--sticker-lighting-constant': '0.1',
          '--peel-direction':          `${peelDirection}deg`,
          '--peel-amount':             '0.95',        // initial; spring overrides this
          '--sticker-width':           `${size}px`,
          /* computed vars the CSS classes depend on */
          '--sticker-start': 'calc(-1 * var(--sticker-p))',
          '--sticker-end':   'calc(100% + var(--sticker-p))',
        } as React.CSSProperties}
      >
        <div className="sticker-container">
          {/* Bottom portion — the stuck part, revealed as peel-amount → 0 */}
          <div
            className="sticker-main"
            style={{ filter: `url(#${uid}-ds)` }}
          >
            <div style={{ transform: `rotate(calc(-1 * var(--peel-direction)))` }}>
              <div style={{ filter: `url(#${uid}-pl)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={alt}
                  className="sticker-image"
                  draggable={false}
                  src={src}
                />
              </div>
            </div>
          </div>

          {/* Top portion — the curling flap, disappears as peel-amount → 0 */}
          <div className="flap">
            <div style={{ transform: `rotate(calc(-1 * var(--peel-direction)))` }}>
              <div style={{ filter: `url(#${uid}-plf)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="flap-image"
                  draggable={false}
                  src={src}
                  style={{ filter: `url(#${uid}-ef)` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}