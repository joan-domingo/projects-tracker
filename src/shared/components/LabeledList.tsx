import { ReactNodeArray } from 'prop-types';
import React, { FC } from 'react';
import styled from 'styled-components';
import * as colors from '../styles/colors';
import { small } from '../styles/dimensions';

const LabeledTextContainer = styled.div`
  padding: ${small} 0;
`;
const Label = styled.div`
  font-size: 1rem;
  color: ${colors.darkGray};
  padding-bottom: 0.3rem;
`;

interface Props {
  label: string;
  items: ReactNodeArray | undefined;
}

const LabeledList: FC<Props> = ({ label, items }) => {
  return (
    <LabeledTextContainer>
      <Label>{label}</Label>
      {items && items.map((item, index) => <div key={index}>{item}</div>)}
    </LabeledTextContainer>
  );
};

export default LabeledList;
