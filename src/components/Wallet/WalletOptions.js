import styled from 'styled-components';


const StyledWalletOptions = styled.div`
  display: flex;
  margin-bottom: 0.75em;
`;

const StyledWalletOption = styled.button`
  flex: 1;
  border-radius: 5px;
  background-color: ${props => props.show ? props.theme.colors.secondary : 'salmon'};
  border: none;
  padding: 12px;
  text-align: center;
  font-size: 0.9em;
  font-weight: 700;
  color: #fff;
  cursor: pointer;

  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    padding: 10px 2px;
    font-size: 0.825em;
  }
`;


function WalletOptions({showProvided, setShowProvided}) {
  return (
    <StyledWalletOptions>
      <StyledWalletOption show={showProvided} style={{marginRight: 10}} onClick={() => setShowProvided(true)}>
        PROVIDED POOLS
      </StyledWalletOption>
      <StyledWalletOption show={!showProvided} style={{marginLeft: 10}} onClick={() => setShowProvided(false)}>
        TRACKED POOLS
      </StyledWalletOption>
    </StyledWalletOptions>
  )
}


export { WalletOptions };