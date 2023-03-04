import React, { useCallback, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Nav, Label, Input, Inputs, Form } from './styles';
import GlobalStyles from '../../styles/global';

const url = "54.238.203.54";

const TwoFactor = () => {
  // const isVal = (value: string) => value.length < 2 && !isNaN(Number(value));
  const p1 = useInput('');
  const p2 = useInput('');
  const p3 = useInput('');
  const p4 = useInput('');
  const p5 = useInput('');
  const p6 = useInput('');
  let password: string = '';
  const navigate = useNavigate();
  const handleInputChange = (index: number, value: string) => {
    if (value.length === 1 && !isNaN(Number(value))) {
      password += value;
      const nextInput = document.getElementById(`p${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      } else {
        const currentInput = document.getElementById(`p${index}`) as HTMLInputElement;
        if (currentInput) {
          currentInput.blur();
        }
      }
    }
  };
  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(password);
      fetch(url + '/twofactor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(password),
      });
      navigate('/home');
    },
    [password]
  );

  return (
    <div>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <h1>Two-Factor Authentication</h1>
        <Form onSubmit={onSubmit}>
          <Label id='password'>
            <span>Google Authenticator</span>
            <Inputs>
              <Input id='p1' maxLength={1} onChange={(e) => handleInputChange(1, e.target.value)}/>
              <Input id='p2' maxLength={1} onChange={(e) => handleInputChange(2, e.target.value)}/>
              <Input id='p3' maxLength={1} onChange={(e) => handleInputChange(3, e.target.value)}/>
              <Input id='p4' maxLength={1} onChange={(e) => handleInputChange(4, e.target.value)}/>
              <Input id='p5' maxLength={1} onChange={(e) => handleInputChange(5, e.target.value)}/>
              <Input id='p6' maxLength={1} onChange={(e) => handleInputChange(6, e.target.value)}/>
            </Inputs>
          </Label>
          <Button type='submit'>LogIn</Button>
        </Form>
      </Container>
    </div>
  );
};


export default TwoFactor;

