import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
   border: 1px solid #aaa6;
   padding: 10px;
   padding-left: 90px;
   padding-right: 90px;
   margin: 0 auto;
   margin-bottom: 10px;
   width: 100%;
   font-size: 15px;
`;

const Cell = styled.td`
   border-bottom: 1px dashed #6663;
`;

function SpecialChars() {
   return (
      <Table>
         <tr style={{ textAlign: 'left' }}>
            <th>Special Characters</th>
            <th>Generates a random...</th>
         </tr>
         <tr>
            <Cell>##</Cell>
            <Cell>number 1-7</Cell>
         </tr>
         <tr>
            <Cell>#-#</Cell>
            <Cell>number 7-16</Cell>
         </tr>
         <tr>
            <Cell>#.#</Cell>
            <Cell>decimal number</Cell>
         </tr>
         <tr>
            <Cell>$$</Cell>
            <Cell>adjective</Cell>
         </tr>
         <tr>
            <Cell>^^</Cell>
            <Cell>first name</Cell>
         </tr>
         <tr>
            <Cell>{`@@`}</Cell>
            <Cell>animal</Cell>
         </tr>
      </Table>
   );
}

export default SpecialChars;
