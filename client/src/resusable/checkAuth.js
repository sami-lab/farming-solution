import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from './spinner';
import { Typography } from '@material-ui/core';

export default function CheckAuth(props) {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    if (props.user === null && props.userToken === null) router.push('/login');
    if (props.managerOnly) {
      if (!props.user?.roles.some((item) => item.name === 'Manager')) {
        setNotFound(true);
      }
    }
    if (props.adminOnly) {
      if (!props.user?.roles.some((item) => item.name === 'Admin')) {
        setNotFound(true);
      }
    }
    setShowAuth(false);
  }, []);
  return showAuth ? (
    <Loading />
  ) : notFound ? (
    <Typography variant="h1">Resource not found</Typography>
  ) : (
    props.children
  );
}
