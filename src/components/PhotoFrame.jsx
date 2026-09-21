import React from 'react';

export function PhotoFrame({
  src,
  alt = '',
  ratio = '3/4',
  caption,
  tint = true,
  grade = true,
  radius = 'var(--radius-lg)',
  placeholder = 'Foto a inserir',
  objectPosition = '50% 50%',
  children,
  className,
  style,
  ...rest
}) {
  return (
    <figure className={['photo-frame', className].filter(Boolean).join(' ')} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', minWidth: 0, ...style }} {...rest}>
      <div
        className="photo-frame-media"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: ratio,
          borderRadius: radius,
          overflow: 'hidden',
          background: 'var(--roxo-900)',
          border: src ? 'none' : '1px dashed var(--border-lilas)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition,
              ...(grade ? { filter: 'var(--photo-filter)' } : null),
            }}
          />
        ) : (
          <span style={{ fontSize: 'var(--fs-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'center', padding: '0 16px' }}>{placeholder}</span>
        )}
        {src && tint ? <span style={{ position: 'absolute', inset: 0, background: 'var(--photo-tint)', mixBlendMode: 'var(--photo-blend)', pointerEvents: 'none' }} /> : null}
        {children ? <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-protect-bottom)', display: 'flex', alignItems: 'flex-end', padding: 'var(--space-5)' }}>{children}</div> : null}
      </div>
      {caption ? <figcaption className="photo-frame-caption" style={{ fontSize: 'var(--fs-caption)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{caption}</figcaption> : null}
    </figure>
  );
}
