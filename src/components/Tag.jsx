import React from 'react';

export function Tag({ children, tone = 'outline', size = 'md', style, ...rest }) {
  const tones = {
    outline: { background: 'transparent', color: 'var(--text-secondary)', borderColor: 'var(--border-hairline)' },
    lilas: { background: 'transparent', color: 'var(--text-accent)', borderColor: 'var(--border-lilas)' },
    brand: { background: 'var(--surface-card-brand)', color: 'var(--dhy-branco)', borderColor: 'var(--roxo-500)' },
    solid: { background: 'var(--roxo-500)', color: 'var(--dhy-branco)', borderColor: 'var(--roxo-500)' },
  };
  const sizes = {
    sm: { fontSize: '10px', padding: '6px 12px' },
    md: { fontSize: '12px', padding: '9px 18px' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid',
        fontFamily: 'var(--font-text)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...sizes[size],
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
