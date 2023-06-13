import styled, {css} from "styled-components";

interface StarIconProps {
    fillPercentage: number;
    size: string;
}

export const StarIcon = styled.div<StarIconProps>`
    margin: 0 0.2rem;
    height: ${({ size }) => {
        if (size === 'sm') return '1.5rem';
        if (size === 'md') return '2rem';
        if (size === 'lg') return '2.8rem';
        return '0rem';
    }};
    width: ${({ size }) => {
        if (size === 'sm') return '1.5rem';
        if (size === 'md') return '2rem';
        if (size === 'lg') return '2.8rem';
        return '0rem';
    }};
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);

    background: ${({ fillPercentage }) => {
        const color1 = '#FF794F';
        const color2 = 'rgb(168, 168, 168, 0.6)';
        
        if (fillPercentage === 100) {
            return color1;
        } else if (fillPercentage === 0) {
            return color2;
        } else {
            return `
                linear-gradient(
                90deg, 
                ${color1} ${fillPercentage}%,
                ${color2} ${fillPercentage}%
                )
            `;
        }
    }};
`;

export const StarContainer = styled.div`
    display: flex;
`;