import { useState } from 'react';
import styled from 'styled-components';
import { waves } from '../../assets/images';


const StyledImage = styled.img`
  align-self: center;
  margin-left: auto;
  margin-right: -16px;
`;

const StyledDonation = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const DonationButton = styled.button`
  height: 66.44px;
  width: 66.44px;
  font-size: 13px;
  text-align: center;
  border: 1px solid ${({theme}) => theme.colors.blue};
  background-color: ${({theme}) => theme.colors.blue};
  color: #fff;
  font-weight: bold;
  border-radius: 50%;

  :focus {
    outline-color: ${({theme}) => theme.colors.main};
    outline-offset: 2px;
    margin-left: 2px;
  }

  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    :focus {
      margin-right: 2px;
    }
  }
`;

const DonationAddress = styled.p`
  align-self: center;
  margin: 0;
  margin-right: -8px;
  border: 1px dotted ${({theme}) => theme.colors.blue};
  border-right: none;
  border-left: none;
  border-radius: 5px;
  font-size: 0.9em;
  letter-spacing: 1px;
  padding: 8px;
  padding-left: 18px;

  @media(max-width: 28em) {
    font-size: 0.775em;
    letter-spacing: 0.5px;
  }

  @media(max-width: 23.5em) {
    font-size: 0.65em;
    letter-spacing: 0.25px;
  }
`;


function Donation() {
  const [showDonationAddress, setShowDonationAddress] = useState(false);
  
  return (
    <StyledDonation>
      {
        showDonationAddress ?
            <>
            <StyledImage src={waves} alt="waves" style={{width: 34, height: 34}} />
            <DonationAddress>
              3P7sBFEm2fXiX8KKzeF7ZP6eBrdRM8PE2K8
            </DonationAddress>
            </>
           :
          null
        }
      <DonationButton onClick={() => setShowDonationAddress(!showDonationAddress)}>donate</DonationButton>
    </StyledDonation>
  )
}


export { Donation };