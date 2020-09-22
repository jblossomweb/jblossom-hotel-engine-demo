import React from 'react';
import { Layout, Avatar, Spin } from 'antd';
import 'antd/dist/antd.css';

import Theme from '../../theme.style';
import logo from '../../images/logo.svg';
import GithubCorner from '../../components/github-corner';
import * as Style from './MainTemplate.style';

const { Header, Content } = Layout;

export interface Props {
  children: React.ReactChild;
  avatar?: string;
  avatarLink?: string;
  loading?: boolean;
}

const MainTemplate: React.FC<Props> = ({
  avatar,
  avatarLink,
  loading,
  children,
}) => (
  <>
    <GithubCorner href="https://github.com/jblossomweb/jblossom-hotel-engine-demo" />
    <Theme />
    <Style.Layout>
      <Header>
        <Content>
          <img src={logo} alt="logo" />
          {loading ? (
            <Spin />
          ) : (
            <>
              {avatarLink ? (
                <a href={avatarLink} target="_blank" rel="noopener noreferrer">
                  <Avatar src={avatar} />
                </a>
              ) : (
                <Avatar src={avatar} />
              )}
            </>
          )}
        </Content>
      </Header>
      {children}
    </Style.Layout>
  </>
);

export default MainTemplate;
