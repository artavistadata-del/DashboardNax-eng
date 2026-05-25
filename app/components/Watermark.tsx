'use client';

import Image from 'next/image';

/**
 * Watermark Component
 * Renders the Artavista branding watermark fixed at the bottom-right
 * of every page to prevent content claims.
 * - Logo: "Logo Artavista.png" (transparent background, as provided)
 * - Container: white pill background so logo is readable on any page colour
 */
export default function Watermark() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '14px',
        right: '14px',
        zIndex: 9999,
        pointerEvents: 'none',
        userSelect: 'none',
        /* White rounded-pill container */
        background: '#ffffff',
        borderRadius: '12px',
        padding: '6px 14px 6px 10px',
        boxShadow: '0 2px 14px rgba(0,0,0,0.15)',
        border: '1px solid rgba(0,0,0,0.08)',
        opacity: 0.88,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Logo asli Artavista — transparent, tidak diubah */}
      <Image
        src="/Logo Artavista.png"
        alt="Artavista — think visual, visualize it"
        width={120}
        height={36}
        style={{ objectFit: 'contain', display: 'block' }}
        priority
        draggable={false}
      />
    </div>
  );
}

