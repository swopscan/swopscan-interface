import { useState } from 'react';
import styled from 'styled-components';


const StyledWalletInput = styled.input.attrs({type: 'search'})`
  padding: 0.5em 1em;
  border: 2px solid ${props => props.valid ? props.theme.colors.main : props.theme.colors.secondary};
  border-right: none;
  border-radius: 5px 0 0 5px;
  font-size: 1.1em;
  letter-spacing: 1px;
  flex-grow: 1;
  min-width: 218px;

  ::placeholder {
    color: #6B6B6B;
  }

  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    min-width: 0;
    padding: 0.1em;
    letter-spacing: 0;
    font-size: 1em;
  }
`;

const StyledFindButton = styled.button`
  border: 2px solid ${({theme}) => theme.colors.main};
  border-left: none;
  border-radius: 0 5px 5px 0;
  padding: 0.5em 1em;
  font-size: 1.1em;
  background-color: ${({theme}) => theme.colors.main};
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  
  :hover {
    background-color: ${({theme}) => theme.colors.main};
  }
`;

const StyledWalletSearchForm = styled.section`
  flex-basis: 100%;
  margin-top: 1.2em;
`;


function WalletSearchForm({changeWalletAddress, changeShowWallet, showHomeScreen, showPool}) {
  const [walletAddress, setWalletAddress] = useState('');
  const [validAddress, setValidAddress] = useState(true);

  function verifyAddress() {
    const regex = /^3P[a-zA-Z0-9]{33}$/;
    return regex.test(walletAddress);
  }

  function handleWalletQuery(event) {
    event.preventDefault();
    if(verifyAddress()) {
      if(!validAddress) {
        setValidAddress(true);
      }
      changeWalletAddress(walletAddress);
      changeShowWallet(true);
      showHomeScreen(false);
      showPool(undefined);
    } else {
      setValidAddress(false);
    }
  }

  return (
    <StyledWalletSearchForm aria-label="wallet search">
      <form role="search" onSubmit={handleWalletQuery} style={{display: 'flex'}}>
        <StyledWalletInput valid={validAddress} value={walletAddress} onChange={(event) => setWalletAddress(event.target.value)} placeholder={validAddress ? "Please enter a Waves address." : "Invalid address, please enter a Waves address."} />
        <StyledFindButton>FIND</StyledFindButton>
        </form>
    </StyledWalletSearchForm>
  )
}


export { WalletSearchForm };