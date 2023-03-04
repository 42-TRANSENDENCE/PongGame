import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ bg }) => bg};
  border: 0.5rem solid black;
  // margin: 5% 15%;
  margin: 7vh 15vw;
  box-shadow: 20px 20px;

  h1 {
    color: #FFFFFF;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    font-size: 10vw;
    line-height: 24px;
    align-items: center;
    text-align: center;
    padding: 1.5%;
    text-transform: uppercase;
    &:hover {
      color: black;
    }
`

export const Nav = styled.nav`
  background-color: black;
  color: white;
  font-size: 18px;
  font-weight: 800;
  padding: 0 9em 0 1em;
  width: 100%;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`

export const Button = styled.button`
  border-radius: 10px;
  border: 3px solid #000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 3vw;
  font-weight: 800;
  margin: 2em 8em;
  padding: 30px 30px;
  background-color: ${({ bg }) => bg || '#7C4DFF'};
  color: ${({ color }) => color || 'white'};
  box-sizing: border-box;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const Label = styled.label`

  & > span {
    display: block;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
    line-height: 1.46666667;
  }
`

export const Input = styled.input`
  display: flex;
  margin: 0 auto;
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 30%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1;
  transition: 0.4s;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    width: 40%;
  }
`
