import React, { useState } from 'react';

const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  fontFamily: 'var(--font-display)',
  fontWeight: 'var(--fw-medium)',
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-base) var(--ease-out)',
};
const sizes = {
  sm: { fontSize: '11px', padding: '10px 18px' },
  md: { fontSize: '12px', padding: '14px 26px' },
  lg: { fontSize: '14px', padding: '18px 36px' },
};
const variants = {
  primary: { background: 'var(--roxo-500)', color: 'var(--dhy-branco)', borderColor: 'var(--roxo-500)' },
  secondary: { background: 'transparent', color: 'var(--dhy-branco)', borderColor: 'var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--text-accent)', borderColor: 'transparent', paddingLeft: 0, paddingRight: 0 },
  solid: { background: 'var(--dhy-branco)', color: 'var(--preto-900)', borderColor: 'var(--dhy-branco)' },
};
const hovers = {
  primary: { background: 'var(--roxo-400)', borderColor: 'var(--roxo-400)', boxShadow: 'var(--shadow-neon)' },
  secondary: { borderColor: 'var(--dhy-branco)', background: 'rgba(255,255,255,.06)' },
  ghost: { color: 'var(--dhy-branco)' },
  solid: { background: 'var(--roxo-200)', borderColor: 'var(--roxo-200)' },
};

export function Button({ variant = 'primary', size = 'md', href, icon, disabled = false, full = false, children, style, type, ...rest }) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const s = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(h && !disabled ? hovers[variant] : null),
    ...(p && !disabled ? { transform: 'scale(var(--press-scale))' } : null),
    ...(h && !disabled && variant !== 'ghost' ? { transform: p ? 'scale(var(--press-scale))' : 'translateY(var(--hover-lift))' } : null),
    ...(disabled ? { opacity: .38, cursor: 'not-allowed' } : null),
    ...(full ? { display: 'flex', width: '100%' } : null),
    ...style,
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      type={href ? undefined : type || 'button'}
      disabled={!href ? disabled : undefined}
      style={s}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false); }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      {...rest}
    >
      {children}
      {icon ? <span style={{ fontSize: '1.1em', lineHeight: 1, transform: h ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-fast) var(--ease-out)' }}>{icon}</span> : null}
    </Tag>
  );
}
