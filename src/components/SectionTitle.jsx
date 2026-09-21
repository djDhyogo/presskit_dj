import React from 'react';

export function SectionTitle({ eyebrow, children, lead, size = 'display-2', align = 'left', style, ...rest }) {
  const sizes = {
    poster: 'var(--fs-poster)',
    'display-1': 'var(--fs-display-1)',
    'display-2': 'var(--fs-display-2)',
    'title-1': 'var(--fs-title-1)',
  };
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style }} {...rest}>
      {eyebrow ? (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', fontFamily: 'var(--font-text)', fontSize: 'var(--fs-eyebrow)', fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>
          <span style={{ width: '42px', height: '1px', background: 'currentColor', opacity: .6 }} />
          {eyebrow}
        </div>
      ) : null}
      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)', fontSize: sizes[size], lineHeight: 'var(--lh-display)', letterSpacing: 'var(--ls-display)', textTransform: 'uppercase', color: 'var(--text-primary)', textWrap: 'balance' }}>{children}</h2>
      {lead ? <p style={{ margin: 0, maxWidth: 'var(--measure-default)', fontSize: 'var(--fs-body-lg)', lineHeight: 'var(--lh-body)', color: 'var(--text-secondary)', textWrap: 'pretty' }}>{lead}</p> : null}
    </header>
  );
}
