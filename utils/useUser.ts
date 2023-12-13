import { useEffect, useState } from 'react';
import { getUser } from '@/lib/actions/user.actions';

const useUser = (email: string | null) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (email) {
        console.log('User email:', email);
        try {
          const retrievedUser = await getUser(email);
          setUser(retrievedUser);
        } catch (error) {
          console.error('Error while fetching user by email', error);
        }
      }
    };

    fetchUser();
  }, [email]);

  return user;
};

export default useUser;