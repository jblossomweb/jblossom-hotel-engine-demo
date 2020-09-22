import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

export interface Props {
  search: (query: string) => void;
  searching?: boolean;
  query?: string;
}

const SearchInput: React.FC<Props> = ({ search, searching, query }) => {
  const [edit, setEdit] = useState(query?.length ? query : undefined);
  useEffect(() => setEdit(query), [query]);
  return (
    <Input.Search
      placeholder="Search GitHub Repositories"
      disabled={searching}
      loading={searching}
      onSearch={search}
      defaultValue={query}
      value={edit}
      onChange={({ target: { value } }) => {
        setEdit(value);
      }}
      enterButton
      allowClear
    />
  );
};

export default SearchInput;
