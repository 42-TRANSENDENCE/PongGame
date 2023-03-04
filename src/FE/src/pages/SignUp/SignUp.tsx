import React, { useCallback, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { Container, Button, Nav, Label, Input } from './styles';
import GlobalStyles from '../../styles/global';

const SignUp = () => {
  const navigate = useNavigate();

  const isValidUsername = (username: string): boolean => {
    const consecutivePeriodsRegex = /\.{2,}/;
    const invalidCharactersRegex = /[^\w-.']/;
  
    // lowercase the username
    username = username.toLowerCase();
  
    // check for consecutive periods and invalid characters
    if (consecutivePeriodsRegex.test(username) || invalidCharactersRegex.test(username)) {
      return false;
    }
  
    // check the length
    if (username.length > 12) {
      return false;
    }
  
    return true;
  };
  
  const nickname = useInput('', isValidUsername);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      fetch(url + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nickname),
      });
      navigate('/home');
    },
    [nickname]
  );

  return (
    <div>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <h1>42 PONG</h1>
        <form onSubmit={onSubmit}>
          <Label id='nickname-label'>
            <span>Nickname</span>
            <Input placeholder='nickname' {...nickname} />
          </Label>
          <Button type='submit'>Sign Up</Button>
        </form>
      </Container>
    </div>
  );
};

export default SignUp;
