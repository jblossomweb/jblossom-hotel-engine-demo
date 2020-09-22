import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';

export const octocatWave = keyframes`
  0%,
  100% {
    transform: rotate(0)
  }
  20%,
  60% {
    transform: rotate(-25deg)
  }
  40%,
  80% {
    transform: rotate(10deg)
  }
`;

export const Wrapper = styled.div`
  z-index: 2;

  a {
    width: ${rem(60)};
    height: ${rem(40)};
  }

  .github-corner:hover .octo-arm {
    animation: ${octocatWave} 560ms ease-in-out;
  }
  @media (max-width: ${rem(500)}) {
    .github-corner:hover .octo-arm {
      animation: none;
    }
    .github-corner .octo-arm {
      animation: ${octocatWave} 560ms ease-in-out;
    }
  }
`;

export const Anchor = styled.a`
  :hover .octo-arm {
    animation: ${octocatWave} 560ms ease-in-out;
  }
`;
