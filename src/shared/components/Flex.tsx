import styled from 'styled-components';

type FlexDirection = 'row' | 'column';

interface Props {
  direction: FlexDirection;
}

const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${props => props.direction};
`;

export default Flex;
