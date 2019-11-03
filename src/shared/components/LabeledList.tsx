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
  items: ReactNodeArray;
}

const LabeledList: FC<Props> = props => {
  return (
    <LabeledTextContainer>
      <Label>{props.label}</Label>
      {props.items.map(item => item)}
    </LabeledTextContainer>
  );
};

export default LabeledList;
