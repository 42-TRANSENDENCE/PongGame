import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Container, Button, Nav } from './styles';
import GlobalStyles from '../../styles/global';

const LogIn = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const onClick = () => {
    const apiUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = apiUrl;
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    
    if (authorizationCode) {
      const data = {
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        redirect_uri: redirectUri,
      };
  
      fetch("https://api.intra.42.fr/oauth/token", {
        method: "POST",
        body: new URLSearchParams(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to retrieve access token");
          }
          return response.json();
        })
        .then((data) => {
          const accessToken = data.access_token;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          fetch("https://api.intra.42.fr/v2/me", {
            headers,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to retrieve user data");
              }
              return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error))
        .finally(() => {
          // Remove the 'code' parameter from the URL
          window.history.replaceState({}, document.title, window.location.pathname);
        });
    }
  }, [clientId, clientSecret, redirectUri]);
  

  return (
    <>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <h1>42 PONG</h1>
        <Button onClick={onClick}>42 LogIn</Button>
      </Container>
    </>
  );
};

export default LogIn;
