import React from 'react';

export function StatBlock({ value, label, caption, align = 'left', size = 'lg', style, ...rest }) {
  const sizes = { md: 'var(--fs-title-1)', lg: 'var(--fs-display-2)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start', ...style }} {...rest}>
      {caption ? <span style={{ fontSize: 'var(--fs-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{caption}</span> : null}
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)', fontSize: sizes[size], lineHeight: 1, letterSpacing: 'var(--ls-display)', color: 'var(--text-primary)' }}>{value}</span>
      {label ? <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-accent)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</span> : null}
    </div>
  );
}
