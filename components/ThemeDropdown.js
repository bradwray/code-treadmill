import React, { useContext } from 'react';

import { Context } from './AppContext';
import dracula from 'prism-react-renderer/themes/dracula';
import duotoneDark from 'prism-react-renderer/themes/duotoneDark';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import okaidia from 'prism-react-renderer/themes/okaidia';
import styled from 'styled-components';
import vsDark from 'prism-react-renderer/themes/vsDark';

const Select = styled.select`
   width: 200px;
   height: 40px;
`;

function Dropdown() {
   const [store, setStore] = useContext(Context);
   const handleChange = (val) => {
      if (val == 'vsDark') {
         setStore({ ...store, theme: vsDark, themeName: 'vsDark' });
      } else if (val == 'nightOwl') {
         setStore({ ...store, theme: nightOwl, themeName: 'nightOwl' });
      } else if (val == 'dracula') {
         setStore({ ...store, theme: dracula, themeName: 'dracula' });
      } else if (val == 'duotoneDark') {
         setStore({ ...store, theme: duotoneDark, themeName: 'duotoneDark' });
      } else if (val == 'oceanicNext') {
         setStore({ ...store, theme: oceanicNext, themeName: 'oceanicNext' });
      } else if (val == 'okaidia') {
         setStore({ ...store, theme: okaidia, themeName: 'okaidia' });
      }
   };
   const options = ['vsDark', 'nightOwl', 'dracula', 'duotoneDark', 'oceanicNext', 'okaidia'];
   console.log(store);
   return (
      <Select value={store.themeName} onChange={(e) => handleChange(e.target.value)}>
         {options.map((item, i) => (
            <option key={i}>{item}</option>
         ))}
      </Select>
   );
}

export default Dropdown;
