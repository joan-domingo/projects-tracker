import Rating from '@material-ui/lab/Rating';
import React, { FC } from 'react';
import styled from 'styled-components';
import * as colors from '../styles/colors';
import { small } from '../styles/dimensions';

const LabeledRatingContainer = styled.div`
  padding: ${small} 0;
`;

const Label = styled.div`
  font-size: 1rem;
  color: ${colors.darkGray};
  padding-bottom: 0.3rem;
`;

interface Props {
  label?: string;
  name?: string;
  value: number;
  onChange?: (value: number) => void;
}

const LabeledRating: FC<Props> = props => {
  return (
    <LabeledRatingContainer>
      {props.label && <Label>{props.label}</Label>}
      <Rating
        name={props.name}
        value={props.value}
        onChange={(event, newValue) => {
          Boolean(props.onChange && props.onChange(newValue));
        }}
        precision={0.5}
        readOnly={!props.onChange}
      />
    </LabeledRatingContainer>
  );
};

export default LabeledRating;
