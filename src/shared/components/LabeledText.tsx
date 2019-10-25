import React, { FC } from 'react';
import styled from 'styled-components';
import * as colors from '../styles/colors';

const LabeledTextContainer = styled.div`
  padding 0.5rem 0;
`;
const Label = styled.div`
  font-size: 1rem;
  color: ${colors.darkGray};
  padding-bottom: 0.3rem;
`;
const Text = styled.div`
  font-size: 1rem;
`;

interface Props {
  label: string;
  text: string;
}

const LabeledText: FC<Props> = props => {
  return (
    <LabeledTextContainer>
      <Label>{props.label}</Label>
      <Text>{props.text}</Text>
    </LabeledTextContainer>
  );
};

export default LabeledText;
