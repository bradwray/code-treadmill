import DigitalReadOut from './DigitalReadOut.js';
import styled from 'styled-components';

const DisplayContainer = styled.div`
   width: 380px;
   height: 136px;
   border: 1px solid #666;
   border-radius: 10px;
   background-color: #111;
   padding-top: 32px;
   box-shadow: inset 0px 0px 2px 0px white;
`;

const Readouts = styled.div`
   margin-top: -8px;
   display: flex;
   justify-content: center;
`;

const Label = styled.span`
   position: absolute;
   text-align: center;
   font-family: 'Orbitron', sans-serif;
   background-color: #111;
   color: #ddd;
   z-index: 2000;
   font-size: 25px;
   transform: translateY(${(props) => props.bump}px) translateX(8px);
`;

const Line = styled.hr`
   width: 377px;
   z-index: 0;
   transform: translateY(${(props) => props.bump}px);
   height: 3px;
   color: #fff;
   border: 0;
   background-color: #ddd;
`;

export default function ResultsDisplay() {
   return (
      <DisplayContainer>
         <Label bump={-30}>RPM</Label>
         <Line bump={'-26'} />
         <Readouts>
            <DigitalReadOut value={'100'} label={'reading'} measure={'confetti/min'} />
            <DigitalReadOut value={'0.25'} label={'writing'} measure={'confetti/min'} />
            <DigitalReadOut value={'25'} label={'combined'} measure={'confetti/min'} />
         </Readouts>
      </DisplayContainer>
   );
}
