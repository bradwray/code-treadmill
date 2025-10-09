import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Context } from './AppContext';
import hexThemeColors from '../utils/hexThemeColors';
import options from '../themes/themeOptions';

import type { ThemeOption } from '../themes/themeOptions';

const Select = styled.select`
   width: 100px;
   height: 40px;
   padding-left: 5px;
   font-family: 'Orbitron', sans-serif;
   border: 1px solid ${(props) => props.theme.plain.color + '99'};
   color: ${(props) => props.theme.plain.color};
   background: ${(props) => props.theme.plain.backgroundColor};
   margin: 10px;
`;

const Label = styled.span`
   position: absolute;
   text-align: center;
   font-family: 'Orbitron', sans-serif;
   color: ${(props) => props.theme.plain.color};
   background: ${(props) => props.theme.plain.backgroundColor};
   z-index: 2000;
   font-size: 10px;
   transform: translateY(4px) translateX(15px);
`;

function Dropdown(): React.ReactElement {
  const [store, setStore] = useContext(Context);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored) {
      const index = Number(stored);
      if (!Number.isNaN(index)) {
        void applyTheme(index);
      }
    }
  }, []);

  const applyTheme = async (index: number) => {
    const themeOption: ThemeOption | undefined = options[index];
    if (!themeOption) {
      return;
    }

    const themeModule = await import(`../themes/${themeOption.name}.cjs.js`);
    const newTheme = hexThemeColors(themeModule.default);

    setStore((prev) => ({
      ...prev,
      theme: newTheme,
      themeName: themeOption.name,
      themeType: themeOption.type,
      themeNum: index,
    }));
  };

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(event.target.value);
    if (Number.isNaN(index)) {
      return;
    }
    window.localStorage.setItem('theme', String(index));
    await applyTheme(index);
  };

  return (
    <div>
      <Label>Theme</Label>

      <Select value={store.themeNum} autoFocus={false} onChange={handleChange}>
        {options.map((item, i) => (
          <option value={i} key={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default Dropdown;
