import styled from 'styled-components';

export const StyledNavBar = styled.nav`
  font-size: 25px;
  background-image: linear-gradient(260deg,  rgb(42,244,152,255) 0%, #3498db 100%); 
  border: 1px solid rgba(0,0,0,0.2);
  padding-bottom: 10px;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-around;
    padding: 0 25em 0 25em;
    padding-bottom: 0;
    height: 70px;
    align-items: center;
  }
`