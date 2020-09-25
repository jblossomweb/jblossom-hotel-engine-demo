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

export const Form = styled.div`
  margin-bottom: ${rem(8)};
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardList = styled.div`
  .ant-card {
    animation: ${fadeIn} ease 0.5s;
    margin-bottom: ${rem(8)};
    display: ${({ loadingData }: { loadingData?: boolean }) =>
    loadingData ? 'none' : 'block'};
  }
`;
