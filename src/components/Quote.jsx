import React from 'react';

export function Quote({ children, attribution, style, className, ...rest }) {
  return (
    <figure className={['quote', className].filter(Boolean).join(' ')} style={style} {...rest}>
      <blockquote className="quote-text">{children}</blockquote>
      {attribution ? <figcaption className="quote-attr">{attribution}</figcaption> : null}
    </figure>
  );
}
