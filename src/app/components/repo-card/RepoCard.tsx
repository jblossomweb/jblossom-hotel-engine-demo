import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  GithubOutlined,
  StarOutlined,
  CodeOutlined,
  ForkOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import { Repository, User } from '../../types';
import { FlexRowLeft } from '../../shared.style';

export interface Props {
  owner: User['login'];
  name: Repository['name'];
  description: Repository['description'];
  stargazers_count: Repository['stargazers_count'];
  forks_count: Repository['forks_count'];
  language: Repository['language'];
}

const RepoCard: React.FC<Props> = ({
  name,
  description,
  stargazers_count,
  forks_count,
  language,
  owner,
}) => (
  <Card>
    <h3>
      <GithubOutlined />
      &nbsp;
      <Link to={`/repos/${owner}/${name}`}>
        {owner}/{name}
      </Link>
    </h3>
    <p>{description}</p>
    <FlexRowLeft>
      {language?.length ? (
        <p>
          <CodeOutlined />
          &nbsp;
          {language}
        </p>
      ) : null}
      <p>
        <StarOutlined />
        &nbsp;
        {stargazers_count.toLocaleString()}
      </p>
      <p>
        <ForkOutlined />
        &nbsp;
        {forks_count.toLocaleString()}
      </p>
    </FlexRowLeft>
    <FlexRowLeft style={{ marginBottom: 16 }}>
      <Button
        type="primary"
        href={`/repos/${owner}/${name}`}
        icon={<RightCircleOutlined />}
      >
        Details
      </Button>
    </FlexRowLeft>
  </Card>
);

export default RepoCard;
