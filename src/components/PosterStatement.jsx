import React from 'react';

export function PosterStatement({ as: Tag = 'p', children, highlight, align = 'left', size = 'var(--fs-display-1)', style, ...rest }) {
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-bold)',
        fontSize: size,
        lineHeight: 'var(--lh-display)',
        letterSpacing: 'var(--ls-display)',
        textTransform: 'uppercase',
        color: 'var(--text-primary)',
        textAlign: align,
        maxWidth: '18ch',
        textWrap: 'balance',
        ...style,
      }}
      {...rest}
    >
      {children}
      {highlight ? <><br /><span style={{ color: 'var(--text-accent)' }}>{highlight}</span></> : null}
    </Tag>
  );
}
