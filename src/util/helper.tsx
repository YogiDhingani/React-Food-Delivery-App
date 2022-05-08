import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export const getUser = () => {
  const auth = getAuth();
  const user = useAuthState(auth);

  return user;
};
