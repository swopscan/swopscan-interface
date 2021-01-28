import styled from 'styled-components';
import { Title } from './Title.js';
import { Donation } from './Donation.js';
import { WalletSearchForm } from './WalletSearchForm';


const StyledHeader = styled.header`
  grid-area: header;
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
`;

const TopWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
  height: 66.44px;

  @media(max-width: 42.875em) {
    flex-wrap: wrap;
    height: 116.44px;
  }
`;


function Header({loading, walletFormProps, ...props}) {
  return (
    <StyledHeader>
      <TopWrapper>
        <Title {...props} />
        <Donation />
      </TopWrapper>
      {
        (loading) ?
          null :
          <WalletSearchForm {...walletFormProps} />
      }
    </StyledHeader>
  )
}


export { Header };