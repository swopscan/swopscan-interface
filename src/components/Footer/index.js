import styled from 'styled-components';


const StyledFooter = styled.footer`
  grid-column: 1 / -1;
  grid-area: footer;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid ${({theme}) => theme.colors.main};
  border-radius: 5px;
  padding: 0.75em;
`;

const StyledInformation = styled.p`
  color: ${({theme}) => theme.colors.main};
  margin: 0;
`;

const StyledLink = styled.a`
  color: ${({theme}) => theme.colors.blue};
  font-weight: bold;
  margin-left: 0.75em;

  :hover {
    color: ${({theme}) => theme.colors.main}
  }
`;


function Footer() {
  return (
    <StyledFooter>
      <StyledInformation style={{flex: '100%'}}>
        swopscan is not affiliated with 
        <StyledLink href="https://swop.fi" style={{marginLeft: '0.25em'}}>swop.fi</StyledLink> 
      </StyledInformation>
      <StyledInformation>swopscan v0.5</StyledInformation>
      <StyledLink href="https://github.com/swopscan">github</StyledLink>
      <StyledLink href="https://twitter.com/swopscan" style={{marginRight: 'auto'}}>twitter</StyledLink>
    </StyledFooter>
  )
}


export { Footer };