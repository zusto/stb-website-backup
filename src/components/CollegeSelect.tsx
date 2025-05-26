import { Select } from 'antd';
import { sampleSchoolsList } from '../data/schoolsList';
import debounce from 'lodash/debounce';
import { useState } from 'react';

interface CollegeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const CollegeSelect: React.FC<CollegeSelectProps> = ({ value, onChange }) => {
  const [options, setOptions] = useState(sampleSchoolsList);

  const handleSearch = debounce((searchText: string) => {
    const filteredOptions = sampleSchoolsList.filter(school => 
      school.label.toLowerCase().includes(searchText.toLowerCase())
    );
    setOptions(filteredOptions);
  }, 300);

  return (
    <Select
      showSearch
      value={value}
      placeholder="Search for your college..."
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={onChange}
      notFoundContent={null}
      options={options}
      style={{ width: '100%' }}
      optionFilterProp="children"
      loading={false}
    />
  );
};