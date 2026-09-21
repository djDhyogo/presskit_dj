import React from 'react';

export function Eyebrow({ children, rule = true, tone = 'lilas', style, ...rest }) {
  const c = tone === 'lilas' ? 'var(--text-accent)' : tone === 'muted' ? 'var(--text-muted)' : 'var(--dhy-branco)';
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--fs-eyebrow)',
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color: c,
        ...style,
      }}
      {...rest}
    >
      {rule ? <span style={{ width: '42px', height: '1px', background: 'currentColor', opacity: .6 }} /> : null}
      {children}
    </div>
  );
}
