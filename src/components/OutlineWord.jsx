import React from 'react';

export function OutlineWord({ children, size = 'var(--fs-poster)', color = 'var(--text-outline)', weight = 800, align = 'left', style, ...rest }) {
  return (
    <div
      aria-hidden="true"
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: weight,
        fontSize: size,
        lineHeight: 'var(--lh-poster)',
        letterSpacing: 'var(--ls-poster)',
        textTransform: 'uppercase',
        color: 'transparent',
        WebkitTextStroke: '1px ' + color,
        textAlign: align,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
