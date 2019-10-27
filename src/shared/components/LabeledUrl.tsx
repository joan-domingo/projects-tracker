import Link from '@material-ui/core/Link';
import React, { FC } from 'react';
import styled from 'styled-components';
import * as colors from '../styles/colors';
import { small } from '../styles/dimensions';

const LabeledUrlContainer = styled.div`
  padding: ${small} 0;
`;
const Label = styled.div`
  font-size: 1rem;
  color: ${colors.darkGray};
  padding-bottom: 0.3rem;
`;

interface Props {
  label: string;
  url: string;
}

const LabeledUrl: FC<Props> = props => {
  return (
    <LabeledUrlContainer>
      <Label>{props.label}</Label>
      <Link color="primary" href={props.url} target="_blank" rel="noopener">
        {props.url}
      </Link>
    </LabeledUrlContainer>
  );
};

export default LabeledUrl;
