// TODO: Make a hook to globally fetch the current user's email or other info
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

/**
 * Hook for retrieving data for the user currently logged in.
 * 
 * Returns an array of size 3:
 * [
 *   userData: JS object with user document and accessToken,
 *   login: (token) => void (callback for logging in a user via token)
 *   logout: () => void (callback for logging out a user)
 * ]
 */
const useAuth = () => {
  const [{ accessToken }, setCookie, removeCookie] = useCookies([
    'accessToken',
  ]);
  const [userData, setUserData] = useState(() => {
    console.log('YOU SHOULD ONLY APPEAR ONCE')
    return { accessToken }
  });
  console.log('Access token: ', accessToken);

  useEffect(() => {
    console.log('Effecto: ', accessToken);
    if (!accessToken) setUserData({ accessToken });
    const getUser = async () => {
      const response = await fetch('/auth', {
        headers: {
          'authorization': `Bearer ${accessToken}`
        }
      });
      const body = await response.json();
      if (response.status !== 200) return;
      setUserData(body);
    };
    getUser();
  }, [accessToken]);

  const login = token => setCookie('accessToken', token);
  const logout = () => removeCookie('accessToken');

  return [userData, login, logout];
};

export default useAuth;
