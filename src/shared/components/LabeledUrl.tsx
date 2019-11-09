import Link from '@material-ui/core/Link';
import React, { FC } from 'react';
import styled from 'styled-components';
import { small } from '../styles/dimensions';

const LabeledUrlContainer = styled.div`
  padding: ${small} 0;
  margin-top: 1.6rem;
`;

interface Props {
  label: string;
  url: string;
}

const LabeledUrl: FC<Props> = props => {
  return (
    <LabeledUrlContainer>
      <Link color="primary" href={props.url} target="_blank" rel="noopener">
        {props.label}
      </Link>
    </LabeledUrlContainer>
  );
};

export default LabeledUrl;
