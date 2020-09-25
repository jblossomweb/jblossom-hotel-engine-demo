import React from 'react';
import { Select } from 'antd';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { SearchRequest } from '../../services/github-service/types';
import * as Style from './SearchSorting.style';

export interface Props {
  loading?: boolean;
  sort?: SearchRequest['sort'];
  order?: SearchRequest['order'];
  setSorting: (
    sort?: SearchRequest['sort'],
    order?: SearchRequest['order']
  ) => void;
}

const SearchSorting: React.FC<Props> = ({
  loading,
  sort,
  order,
  setSorting,
}) => (
  <Style.Wrapper>
    <Select
      style={{ width: 180 }}
      disabled={loading}
      value={sort || 0}
      onChange={(value) => {
        if (value) {
          setSorting(value as SearchRequest['sort'], order || 'desc');
        } else {
          setSorting(); // best match
        }
      }}
    >
      <Select.Option value={0} selected={!sort} default>
        Best Match
      </Select.Option>
      <Select.Option value="stars">Stars</Select.Option>
      <Select.Option value="forks">Forks</Select.Option>
      <Select.Option value="help-wanted-issues">
        Help Wanted Issues
      </Select.Option>
      <Select.Option value="updated">Recently Updated</Select.Option>
    </Select>

    {sort ? (
      <Select
        disabled={loading}
        suffixIcon={
          order === 'desc' ? (
            <SortDescendingOutlined />
          ) : (
            <SortAscendingOutlined />
          )
        }
        value={order || 'desc'}
        onChange={(value) => {
          setSorting(sort, value as SearchRequest['order']);
        }}
      >
        <Select.Option value="asc">ASC</Select.Option>
        <Select.Option value="desc">DESC</Select.Option>
      </Select>
    ) : null}
  </Style.Wrapper>
);

export default SearchSorting;
