import React, { FC } from 'react';

const AuthContainer: FC = ({ children }) => {
  // const dispatch = useDispatch();

  /* useEffect(() => {
    dispatch(initializeAuthAction());
  }); */

  return <>{children}</>;
};

export default AuthContainer;
