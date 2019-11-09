import styled from 'styled-components';

type FlexDirection = 'row' | 'column';

interface Props {
  direction?: FlexDirection;
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
  flexGrow?: number;
}

const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  flex-wrap: ${props => props.flexWrap};
  flex-grow: ${props => props.flexGrow};
`;

export default Flex;
