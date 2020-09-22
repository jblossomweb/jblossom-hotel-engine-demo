import React from 'react';
import { Layout, Typography, Spin } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { Repository } from '../../types';
import { SearchRequest } from '../../services/github-service/types';
import Template from '../../templates/main-template';

import SearchInput from '../../components/search-input';
import RepoCard from '../../components/repo-card';
import SearchPaging from '../../components/search-paging';
import SearchSorting from '../../components/search-sorting';
import SearchFilters from '../../components/search-filters';

import { InnerContent } from '../../shared.style';
import * as Style from './Homepage.style';

const { Header } = Layout;
const { Title } = Typography;

export interface StateProps {
  searching?: boolean;
  request: SearchRequest;
  filteredLanguages: string[];
  pageItems?: Repository[];
  numTotalItems: number;
}

export interface ActionProps {
  search: (query: string) => void;
  addFilteredLanguage: (language: string) => void;
  removeFilteredLanguage: (language: string) => void;
  setPaging: (pageNum: number, pageSize?: number) => void;
  setSorting: (
    sort?: SearchRequest['sort'],
    order?: SearchRequest['order']
  ) => void;
}

export type Props = StateProps & ActionProps;

const HomePage: React.FC<Props> = ({
  setPaging,
  setSorting,
  search,
  searching,
  request,
  filteredLanguages,
  addFilteredLanguage,
  removeFilteredLanguage,
  pageItems,
  numTotalItems,
}) => {
  return (
    <Template>
      <Style.Wrapper>
        <Header>
          <Typography>
            <Title level={3}>
              <GithubOutlined />
              &nbsp;Repository Search
            </Title>
          </Typography>
        </Header>
        <InnerContent>
          <Style.Form>
            <SearchInput
              query={request.q}
              search={search}
              searching={searching}
            />
          </Style.Form>
          <Style.Form>
            <SearchFilters
              loading={searching}
              filteredLanguages={filteredLanguages}
              addFilteredLanguage={addFilteredLanguage}
              removeFilteredLanguage={removeFilteredLanguage}
            />
          </Style.Form>
          {numTotalItems ? (
            <Style.Form>
              <Style.Flex>
                <SearchSorting
                  loading={searching}
                  sort={request.sort}
                  order={request.order}
                  setSorting={setSorting}
                />
                <SearchPaging
                  loading={searching}
                  totalItems={numTotalItems}
                  pageNum={request.page}
                  pageSize={request.per_page}
                  setPaging={setPaging}
                />
              </Style.Flex>
            </Style.Form>
          ) : null}
          <Style.CardList loadingData={searching}>
            {pageItems?.map((repo: Repository) => (
              <RepoCard
                key={repo.id}
                owner={repo.owner.login}
                name={repo.name}
                description={repo.description}
                stargazers_count={repo.stargazers_count}
                forks_count={repo.forks_count}
                language={repo.language}
              />
            ))}
          </Style.CardList>
          {searching ? <Spin /> : null}
        </InnerContent>
      </Style.Wrapper>
    </Template>
  );
};

export default HomePage;
