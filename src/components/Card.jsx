import React, { useState } from 'react';

export function Card({ tone = 'glass', padding = 'lg', hoverable = false, children, style, ...rest }) {
  const [h, setH] = useState(false);
  const tones = {
    glass: { background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', backdropFilter: 'blur(var(--blur-glass))' },
    brand: { background: 'var(--surface-card-brand)', border: '1px solid var(--roxo-600)' },
    solid: { background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)' },
    outline: { background: 'transparent', border: '1px solid var(--border-lilas)' },
  };
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--space-5)', lg: 'var(--space-6)', xl: 'var(--space-7)' };
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: pads[padding],
        boxShadow: 'var(--shadow-card),var(--shadow-inset-hair)',
        transition: 'transform var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out)',
        ...tones[tone],
        ...(hoverable && h ? { transform: 'translateY(-4px)', borderColor: 'var(--roxo-400)', boxShadow: 'var(--shadow-lift)' } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
