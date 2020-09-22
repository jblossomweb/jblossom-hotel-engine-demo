import React from 'react';
import { Layout, Typography, Spin } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { Repository } from '../../types';
import Template from '../../templates/main-template';
import RepoDetails from '../../components/repo-details';

import { InnerContent } from '../../shared.style';
import * as Style from './RepositoryPage.style';

const { Header } = Layout;
const { Title } = Typography;

export interface Props {
  repo?: Repository;
  loading?: boolean;
  refresh: () => void;
}

const RepositoryPage: React.FC<Props> = ({ repo, loading, refresh }) => {
  return (
    <Template>
      <Style.Wrapper>
        <Header>
          <Typography>
            <Title level={3}>
              <GithubOutlined />
              &nbsp;Repository Details
            </Title>
          </Typography>
        </Header>
        <InnerContent>
          {repo ? (
            <Style.CardWrapper loadingData={loading}>
              <RepoDetails repo={repo} refresh={refresh} />
            </Style.CardWrapper>
          ) : null}
          {loading ? <Spin /> : null}
        </InnerContent>
      </Style.Wrapper>
    </Template>
  );
};

export default RepositoryPage;
