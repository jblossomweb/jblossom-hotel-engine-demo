import styled from 'styled-components';
import { rem } from 'polished';

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
    margin-bottom: ${rem(8)};
    visibility: ${({ loadingData }: { loadingData?: boolean }) =>
      loadingData ? 'hidden' : 'visible'};
  }
`;
