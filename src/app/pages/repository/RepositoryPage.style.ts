import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';

const fadeIn = keyframes`
0% {
  opacity:0;
}
100% {
  opacity:1;
}
`;

export const Wrapper = styled.div`
  header {
    padding-top: 0;
  }
`;

export const CardWrapper = styled.div`
  .ant-card {
    margin-bottom: ${rem(8)};
    animation: ${fadeIn} ease 0.5s;
    display: ${({ loadingData }: { loadingData?: boolean }) =>
    loadingData ? 'none' : 'block'};
  }
`;
