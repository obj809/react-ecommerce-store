// StarRating.jsx
//
// Displays a product's stored rating with a hover preview. When `editable` and
// a `productId` are given, clicking a star submits that rating: it persists a
// vote (running average) via submitProductRating and shows the new average.
//
// There is no user auth, so a localStorage flag (rated_product_<id>) is used as
// a soft one-vote-per-browser guard. After voting, the stars become read-only.

import React, { useState } from 'react';
import styles from './StarRating.module.scss';
import { submitProductRating } from '../../services/firebase-service';

const TOTAL_STARS = 5;
const ratedKey = (id) => `rated_product_${id}`;

const StarRating = ({ rating = 0, productId, editable = false }) => {
  const [displayRating, setDisplayRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(() =>
    editable && productId ? Boolean(localStorage.getItem(ratedKey(productId))) : false
  );

  const canRate = editable && Boolean(productId) && !hasRated && !submitting;

  const value = Math.min(Math.max(parseFloat(displayRating) || 0, 0), TOTAL_STARS);
  const isHovering = hoverRating !== null;

  // While hovering an editable rating, fill whole stars up to the hovered
  // position; otherwise show the stored value, allowing a single half star.
  const filled = isHovering ? hoverRating : Math.floor(value);
  const hasHalf = !isHovering && value % 1 !== 0 && filled < TOTAL_STARS;

  const handleRate = async (position) => {
    if (!canRate) return;
    setSubmitting(true);
    try {
      const { rating: newAverage } = await submitProductRating(productId, position);
      setDisplayRating(newAverage);
      setHasRated(true);
      localStorage.setItem(ratedKey(productId), String(position));
    } catch (err) {
      console.error('Failed to submit rating', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`${styles.stars} ${canRate ? styles.editable : ''}`}
      onMouseLeave={() => setHoverRating(null)}
      title={canRate ? 'Click to rate' : undefined}
    >
      {Array.from({ length: TOTAL_STARS }, (_, index) => {
        const position = index + 1;
        const isFilled = position <= filled;
        const isHalf = hasHalf && position === filled + 1;

        const className = isFilled
          ? styles.filledStar
          : isHalf
            ? styles.halfStar
            : styles.emptyStar;

        return (
          <span
            key={index}
            className={className}
            onMouseEnter={canRate ? () => setHoverRating(position) : undefined}
            onClick={canRate ? () => handleRate(position) : undefined}
          >
            {/* Half star: a gold outline (matching empty stars) with the left
                half filled on top, so it keeps an outline on the empty side. */}
            {isHalf && <span className={styles.halfStarFill}>★</span>}
            {isFilled ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
