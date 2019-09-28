import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import '../App.css';
import { logoutAction } from '../auth/auth.redux';
import Button from '../shared/components/Button';
import Table from '../shared/components/Table';

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

const DashboardContainer = styled.div``;

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  return (
    <DashboardContainer>
      <p>You are now signed In!</p>
      <Button onClick={handleOnClickLogout} label={'Log out'} />
      <Table title="Projects" columns={columns} data={data} />
    </DashboardContainer>
  );

  function handleOnClickLogout() {
    dispatch(logoutAction());
  }
};

const columns = [
  { field: 'name', title: 'Project Name' },
  { field: 'description', title: 'Project Description' },
  { field: 'team', title: 'Names of the team' },
  { field: 'rating', title: 'rating' },
  { field: 'update', title: 'Last update' },
];

const data = [
  createData(
    'XProject',
    4,
    'Hans, Peter',
    'doing good',
    'canvas digitalization'
  ),
  createData('PProject', 3, 'Johannes, Mariia', 'doing meh', 'toilet app'),
];

function createData(
  name: string,
  rating: number,
  team: string,
  update: string,
  description: string
) {
  return { name, rating, team, update, description };
}

export default withRouter(Dashboard);
