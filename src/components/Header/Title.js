import styled from 'styled-components';
import { swopscan } from '../../assets/images';


const StyledTitle = styled.div`
  align-self: flex-start;
  margin-top: 0;
  margin-left: -4px;
  height: 44.75px;
  cursor: pointer;

  :focus {
    outline: 2px solid ${({theme}) => theme.colors.blue}
  }

  @media(max-width: 42.875em) {
    height: 44.75px;
  }
`;

function Title({showHomeScreen, setShowWallet, showPool}) {
  function titleClickHandler() {
    showHomeScreen(true);
    setShowWallet(false);
    showPool(undefined);
  }
  
  return (
    <StyledTitle tabIndex={0} onClick={titleClickHandler}>
      <img src={swopscan} alt="swopscan" height="100%" />
    </StyledTitle>
  )
}


export { Title };