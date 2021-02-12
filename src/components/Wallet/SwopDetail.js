import styled from 'styled-components';


const StyledWalletPoolDetail = styled.article`
  border: 2px solid ${({theme}) => theme.colors.secondary};
  padding: 8px;
  padding-left: 0;
  border-radius: 5px;
  margin-bottom: 0.75em;
`;

const TitleWrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  margin-top: -8px;
  margin-right: -8px;
`;

const StyledTitle = styled.h2`
  margin: 0;
  margin-bottom: 8px;
  font-size: 1.1em;
  padding: 0.25em 0.5em;
  min-width: 8.5em;
  color: #fff;
  background-color: ${({theme}) => theme.colors.secondary};
  border-bottom: 2px solid ${({theme}) => theme.colors.secondary};
  border-left: 2px solid ${({theme}) => theme.colors.secondary};
  border-bottom-left-radius: 5px;
  text-align: center;
`;

const StyledData = styled.p`
  font-size: 1em;
  letter-spacing: 1px;
  word-spacing: 1px;
  margin: 1em;
`;


function SwopDetail({stakedSwop}) {
  return (
    <StyledWalletPoolDetail>
      <TitleWrapper>
        <StyledTitle>SWOP</StyledTitle>
      </TitleWrapper>
      <StyledData>{stakedSwop.stakedSwop} SWOP is being staked in governance.</StyledData>
    </StyledWalletPoolDetail>
  );
}


export { SwopDetail };