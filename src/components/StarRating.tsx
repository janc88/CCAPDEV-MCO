import React from 'react'
import { StarContainer, StarIcon } from '../styles/Star.styled'

interface StarRatingProps {
    rating: number;
    size: string;
}

const StarRating: React.FC<StarRatingProps> = ({rating, size}) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            var percentage = 100;
            if(rating < 1 && rating > 0) 
                percentage = rating * 100; 
            else if(rating <= 0)
                percentage = 0;
            stars.push(<StarIcon key={i} fillPercentage={percentage} size={size}/>);
            rating--;
        }
        return stars;
    };

  return (
    <StarContainer>
        {renderStars()}
    </StarContainer>
  )
}

export default StarRating