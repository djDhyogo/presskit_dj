import React, { useState } from 'react';

export function ContactRow({ label, value, href, style, ...rest }) {
  const [h, setH] = useState(false);
  const inner = (
    <>
      <span style={{ fontSize: 'var(--fs-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--text-muted)', minWidth: '120px' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-title-3)', letterSpacing: 'var(--ls-title)', color: h ? 'var(--text-accent)' : 'var(--text-primary)', transition: 'color var(--dur-fast) var(--ease-out)' }}>{value}</span>
    </>
  );
  const s = { display: 'flex', alignItems: 'baseline', gap: 'var(--space-5)', padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-hairline)', textDecoration: 'none', ...style };
  return href
    ? <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={s} {...rest}>{inner}</a>
    : <div style={s} {...rest}>{inner}</div>;
}
