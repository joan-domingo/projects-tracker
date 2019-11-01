import styled from 'styled-components';

type FlexDirection = 'row' | 'column';

interface Props {
  direction: FlexDirection;
  justifyContent?: string;
  alignItems?: string;
}

const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`;

export default Flex;
