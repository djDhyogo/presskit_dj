import React from 'react';

export function Logo({ height = 40, tone = 'white', src = '/assets/logo-dhyogo.png', alt = 'DHYOGO', style, ...rest }) {
  const tones = {
    white: 'none',
    lilas: 'brightness(0) saturate(100%) invert(80%) sepia(19%) saturate(923%) hue-rotate(221deg) brightness(97%) contrast(92%)',
    roxo: 'brightness(0) saturate(100%) invert(20%) sepia(63%) saturate(3382%) hue-rotate(266deg) brightness(83%) contrast(96%)',
  };
  return <img src={src} alt={alt} style={{ height: height + 'px', width: 'auto', display: 'block', filter: tones[tone], ...style }} {...rest} />;
}
