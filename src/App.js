import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Register from './components/auth/register';
import Login from './components/auth/login';
import BoardList from './components/board/list';
import GlobalStyle from './components/common/GlobalStyle';
import BoardDetail from './components/board/detail';
import BoardForm from './components/board/form';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: <BoardList />,
    },
    {
      path: '/posts/:id',
      element: <BoardDetail />,
    },
    {
      path: '/posts/:id/edit',
      element: <BoardForm />,
    },
    {
      path: '/posts/write',
      element: <BoardForm />,
    },
  ]);

  return (
    <>
      <Container>
        <RouterProvider router={routes} />
      </Container>

      <GlobalStyle />
    </>
  );
}

const Container = styled.main`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export default App;
