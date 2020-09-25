import React from 'react';
import { Tag, Select } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import languagesPopular from '../../data/languages-popular.json';
import languagesOther from '../../data/languages-other.json';
import * as Style from './SearchFilters.style';

export interface Props {
  loading?: boolean;
  filteredLanguages: string[];
  addFilteredLanguage: (language: string) => void;
  removeFilteredLanguage: (language: string) => void;
}

const SearchFilters: React.FC<Props> = ({
  loading,
  filteredLanguages,
  addFilteredLanguage,
  removeFilteredLanguage,
}) => (
  <Style.Wrapper>
    <Select
      disabled={loading}
      mode="multiple"
      style={{ width: '100%' }}
      placeholder={
        <>
          <CodeOutlined /> language
        </>
      }
      tagRender={({ value }) => (
        <Tag
          closable
          onClose={() => {
            removeFilteredLanguage(String(value));
          }}
        >
          <CodeOutlined /> {value}
        </Tag>
      )}
      value={filteredLanguages}
      onChange={(newValue) => {
        if (newValue.length > filteredLanguages.length) {
          newValue.forEach((language) => {
            if (!filteredLanguages.includes(language)) {
              addFilteredLanguage(language);
            }
          });
        }
      }}
    >
      <Select.OptGroup label="Popular">
        {languagesPopular.map((language) => (
          <Select.Option value={language} key={`popular-${language}`}>
            {language}
          </Select.Option>
        ))}
      </Select.OptGroup>
      <Select.OptGroup label="All">
        {languagesOther.map((language) => (
          <Select.Option value={language} key={`other-${language}`}>
            {language}
          </Select.Option>
        ))}
      </Select.OptGroup>
    </Select>
  </Style.Wrapper>
);

export default SearchFilters;
