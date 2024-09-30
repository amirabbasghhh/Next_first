// src/components/LanguageSwitcher.js
'use client'; // Make this a client component

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };

  return (
    <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
      <InputLabel style={{color:'white'}} id="language-select-label">انتخاب زبان</InputLabel>
      <Select
        style={{color:'white'}}
        labelId="language-select-label"
        id="language-select"
        value={selectedLanguage}
        onChange={changeLanguage}
        label="انتخاب زبان"
        sx={{
            color: 'white',
            backgroundColor: '#333',
            '& .MuiSelect-icon': {
              color: 'white'
            }}}
      >
        <MenuItem style={{color:'black'}} value="en">English</MenuItem>
        <MenuItem style={{color:'black'}} value="fa">فارسی</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
