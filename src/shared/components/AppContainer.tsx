import styled from 'styled-components';
import { appBackgroundColor } from '../styles/colors';

const AppContainer = styled.div`
  display: flex;
  background-color: ${appBackgroundColor};
  min-height: 100vh;
  justify-content: center;
`;

export default AppContainer;
