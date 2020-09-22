import styled from 'styled-components';
import { rem } from 'polished';

import palette from './palette';

export const InnerContent = styled.div`
  padding: ${rem(16)};
  margin: ${rem(16)};
  background-color: ${palette.WHITE};
`;

export const FlexRowLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  > * {
    margin-right: ${rem(16)};
  }
`;
