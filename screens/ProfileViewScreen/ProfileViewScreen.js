import React, {useEffect, useState} from 'react';
import Auth from '../../services/Auth';
import AfterLogin from '../ProfileViewScreen/AfterLogin';
import BeforeLogin from '../ProfileViewScreen/BeforeLogin';

export default function ProfileViewScreen() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    renderComponenet();
  }, []);
  const renderComponenet = async () => {
    const userLogggedInOrNot = await Auth.getUser();
    console.log('login', userLogggedInOrNot);
    setuser(userLogggedInOrNot);
  };
  return user !== null ? <AfterLogin /> : <BeforeLogin />;
}
