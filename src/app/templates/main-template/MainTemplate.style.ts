import styled from 'styled-components';
import { rem } from 'polished';

import { Layout as AntLayout } from 'antd';

import palette from '../../palette';

export const Layout = styled(AntLayout)`
  min-height: 100vh;
  background-color: ${palette.GRAY_LIGHT};

  .ant-layout-header {
    padding: ${rem(16)};
    background-color: ${palette.WHITE};
    height: auto;

    .ant-layout-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
