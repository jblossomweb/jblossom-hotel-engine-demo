import React from 'react';
import { Card, Button, Avatar } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import JSONPretty from 'react-json-pretty';
import monokai from 'react-json-pretty/dist/monikai';
import {
  GithubOutlined,
  StarOutlined,
  CodeOutlined,
  ForkOutlined,
  GlobalOutlined,
  LeftCircleFilled,
} from '@ant-design/icons';

import { Repository } from '../../types';
import { FlexRowLeft } from '../../shared.style';

export interface Props {
  repo: Repository;
  refresh: () => void;
}

const RepoDetails: React.FC<Props> = ({ repo, refresh }) => (
  <Card>
    <h3>
      <Avatar size={'large'} src={repo.owner.avatar_url} />
      &nbsp;
      {repo.full_name}
    </h3>
    <p>{repo.description}</p>
    <p>
      last updated: {new Date(repo.updated_at).toLocaleString()}{' '}
      <SyncOutlined onClick={refresh} />
    </p>
    <FlexRowLeft>
      {repo.language?.length ? (
        <p>
          <CodeOutlined />
          &nbsp;
          {repo.language}
        </p>
      ) : null}
      <p>
        <StarOutlined />
        &nbsp;
        {repo.stargazers_count.toLocaleString()}
      </p>
      <p>
        <ForkOutlined />
        &nbsp;
        {repo.forks_count.toLocaleString()}
      </p>
    </FlexRowLeft>
    <FlexRowLeft style={{ marginBottom: 16 }}>
      <Button href={'/home'} icon={<LeftCircleFilled />}>
        Back
      </Button>
      {repo.homepage ? (
        <Button
          type="primary"
          href={repo.homepage}
          target={'_blank'}
          icon={<GlobalOutlined />}
        >
          Homepage
        </Button>
      ) : null}
      <Button
        type="primary"
        href={repo.html_url}
        target={'_blank'}
        icon={<GithubOutlined />}
      >
        View on GitHub
      </Button>
    </FlexRowLeft>
    <JSONPretty data={repo} theme={monokai} />
  </Card>
);

export default RepoDetails;
