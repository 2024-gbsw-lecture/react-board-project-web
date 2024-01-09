import { decodeToken } from './token';

export const getUserId = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken !== null) {
    const decoded = decodeToken(accessToken);

    return Number(decoded.id);
  }
};
