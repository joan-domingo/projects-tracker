import React, { FC } from 'react';

import '../App.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../auth/auth.redux';

/* const database = firebase.database();

const Dashboard: FC = () => {
  const [data, setData] = useState();

  const componentIsMounted = useRef(true);
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getData();
  }, [data]);

  const getData = () => {
    database
      .ref('/')
      .once('value')
      .then(snapshot => {
        if (componentIsMounted.current) {
          setData(snapshot.val());
        }
      });
  };

  const handleOnPressAddData = () => {
    database.ref('test/').set({
      name: 'joan',
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className="App-link" onClick={handleOnPressAddData}>
          Add Data
        </button>
      </header>
    </div>
  );
};*/

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <p>You are now signed In!</p>
      <button onClick={handleOnClickLogout}>log out</button>
    </div>
  );

  function handleOnClickLogout() {
    dispatch(logoutAction());
  }
};

export default Dashboard;
