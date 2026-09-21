import React from 'react';

export function TimelineItem({ year, title, description, active = false, last = false, style, ...rest }) {
  return (
    <li className={['timeline-event', active ? 'is-current' : '', last ? 'is-last' : ''].filter(Boolean).join(' ')} style={style} {...rest}>
      <span className="timeline-year">{year}</span>
      <div className="timeline-body">
        <span className="timeline-dot" aria-hidden="true" />
        <div className="timeline-copy">
          <h3 className="timeline-title">{title}</h3>
          {description ? <p className="timeline-desc">{description}</p> : null}
        </div>
      </div>
    </li>
  );
}
