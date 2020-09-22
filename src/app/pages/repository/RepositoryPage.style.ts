import styled from 'styled-components';
import { rem } from 'polished';

export const Wrapper = styled.div`
  header {
    padding-top: 0;
  }
`;

export const CardWrapper = styled.div`
  .ant-card {
    margin-bottom: ${rem(8)};
    visibility: ${({ loadingData }: { loadingData?: boolean }) =>
      loadingData ? 'hidden' : 'visible'};
  }
`;
