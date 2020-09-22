import React from 'react';
import { Pagination } from 'antd';

export interface Props {
  loading?: boolean;
  totalItems: number;
  pageNum: number;
  pageSize: number;
  setPaging: (pageNum: number, pageSize?: number) => void;
}

const SearchPaging: React.FC<Props> = ({
  loading,
  totalItems,
  pageNum,
  pageSize,
  setPaging,
}) => (
  <Pagination
    showSizeChanger
    disabled={loading}
    current={pageNum}
    total={totalItems}
    pageSize={pageSize}
    showTotal={(total: number) =>
      `Found ${total.toLocaleString()} repositories`
    }
    onChange={setPaging}
  />
);

export default SearchPaging;
