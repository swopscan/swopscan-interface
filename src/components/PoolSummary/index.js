import { useContext, Fragment } from 'react'; 
import styled from 'styled-components';
import { Repeat } from 'react-feather';
import { PoolDataContext } from '../../App';
import * as images from '../../assets/images';


const TitleWrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  margin-top: -8px;
  margin-right: -8px;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    margin-right: -4px;
  }
`;

const StyledTitle = styled.h2`
  margin: 0;
  margin-bottom: 1em;
  font-size: 1.1em;
  padding: 0.25em 0.5em;
  min-width: 8.5em;
  color: #fff;
  background-color: ${({theme}) => theme.colors.secondary};
  border-bottom: 2px solid ${({theme}) => theme.colors.secondary};
  border-left: 2px solid ${({theme}) => theme.colors.secondary};
  border-bottom-left-radius: 5px;
`;

const HeaderImages = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: ${props => props.width};
  height: ${props => props.width};
  object-fit: cover;
`;

const StyledRepeat = styled(Repeat)`
  height: 100%;
  justify-self: center;
  align-self: center;
  margin-right: 70px;
  margin-left: 70px;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    margin-right: 30px;
    margin-left: 30px;
  }
`;

const PairPrices = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
`;

const PairPriceSeparator = styled.div`
  flex-basis: 30px;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    flex-basis: 10px;
  }
`;

const PairPrice = styled.div`
  margin-top: 6px;
  margin-bottom: 12px;
  font-size: 0.9em;
  letter-spacing: 0.5px;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    font-size: 0.825em;
  }
`;


const TopProviders = styled.ol`
  padding-left: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: max-content minmax(max-content, 1fr) minmax(max-content, 1fr);
  align-items: center;
  gap: 4px;


  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    grid-template-columns: max-content minmax(max-content, 1fr);
  }
`;

const TopProvidersTitle = styled.h3`
  grid-column: 1 / -1;
  margin: 0;
  margin-top: 10px;
  margin-left: -8px;
  padding: 8px;
  font-size: 1.1em;
  color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${({theme}) => theme.colors.secondary};
`;

const WalletOrder = styled.div`
  padding: 5px;
  padding-right: ${props => props.order == 10 ? '5px' : '9px'};
  padding-left: ${props => props.order == 10 ? '5px' : '9px'};
  border: 1px solid ${({theme}) => theme.colors.main};
  color: ${({theme}) => theme.colors.secondary};
  font-weight: 600;
  border-radius: 50%;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    margin-left: -2px;
  }
`;

const WalletAddress = styled.div`
  margin-left: -6px;
  padding-left: 6px;
  letter-spacing: 0.2px;
  font-size: 0.95em;
  border-bottom: 1px dotted ${({theme}) => theme.colors.main};
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    font-size: 0.825em;
    margin-right: 4px;
  }
`;

const WalletBalance = styled.div`
  margin-left: auto;
  margin-right: 1px;
  font-size: 0.95em;
  letter-spacing: 0.5px;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    font-size: 0.825em;
    grid-column: 1 / -1;
    margin-left: 34px;
    justify-self: start;
  }
`;

const InfoWrapper = styled.div`
  border: 1px solid ${({theme}) => theme.colors.secondary};
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 12px;
  padding-bottom: 8px;
  margin-bottom: 10px;
  margin-top: 4px;
  margin-left: -10px;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    padding-right: 0;
  }

  &:hover {
    border: 1px solid ${({theme}) => theme.colors.main};
    border-left-width: 2px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1em;
  font-weight: 600;
  background-color: ${({theme}) => theme.colors.secondary};
  color: #fff;
  width: max-content;
  min-width: 160px;
  margin: 0;
  border: 1px solid ${({theme}) => theme.colors.secondary};
  border-left: none;
  border-bottom-right-radius: 5px;
  padding: 4px 8px;
  margin-left: -10px;
  margin-top: -13px;
  letter-spacing: 1px;
  word-spacing: 1px;

  ${InfoWrapper}:hover & {
    border-color: ${({theme}) => theme.colors.main};
    background-color: ${({theme}) => theme.colors.main};
    margin-left: -13px;
    min-width: 180px;
    padding-left: 9px;
  }

  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    padding-left: 6px;

    ${InfoWrapper}:hover & {
      padding-left: 7px;
    }
  }
`;

const Info = styled.p`
  margin: 0;
  margin-top: 8px;
  letter-spacing: 1px;
  padding-left: 4px;

  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    margin-left: -3px;
    padding-left: 0;
    letter-spacing: 0.05px;
    font-size: 0.775em;

  }
`;

const StyledPoolSummary = styled.main`
  grid-area: content;
  align-self: start;
  border: 2px solid ${({theme}) => theme.colors.secondary};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 0.75em;
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    padding-right: 4px;
  }
`;


function PoolSummary({pool}) {
  const [poolData, poolProviderWallets] = useContext(PoolDataContext);
  const pairPoolData = poolData.find(pairPoolData => pairPoolData.poolPair == pool);
  const pairPoolProviderWallets = poolProviderWallets[Object.keys(poolProviderWallets).find(poolPairName => poolPairName == pool)];

  const stakedAssets = {
    names: ['USDN', 'EURN', 'NSBT'],
    USDN: pairPoolData.usdnStakingBalance,
    EURN: pairPoolData.eurnStakingBalance,
    NSBT: pairPoolData.nsbtStakingBalance
  };
  function displayPairBalance(pair, pairBalance, decimals) {
    if(stakedAssets.names.includes(pair)) {
      return (pairBalance + stakedAssets[pair]).toLocaleString('en-US', {maximumFractionDigits: decimals});
    } else {
      return pairBalance.toLocaleString('en-US', {maximumFractionDigits: decimals});
    }
  }

  return (
    <StyledPoolSummary id={pairPoolData.poolPair}>
      <article>
        <TitleWrapper>
          <StyledTitle>
            {pairPoolData.poolPair}
          </StyledTitle>
        </TitleWrapper>

        <HeaderImages>
          <StyledImage width={"66px"} height={"66px"} src={images[pairPoolData.firstOfPair.toLowerCase()]} alt={pairPoolData.firstOfPair}  />
          <StyledRepeat size={20} color="mediumseagreen" />
          <StyledImage width={"66px"} height={"66px"}  src={images[pairPoolData.secondOfPair.toLowerCase()]} alt={pairPoolData.secondOfPair}  />
        </HeaderImages>

        <PairPrices>
          <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
            <StyledImage width={"12px"} height={"12px"}  src={images[pairPoolData.firstOfPair.toLowerCase()]} alt={pairPoolData.firstOfPair}  />
            <PairPrice>1 {pairPoolData.firstOfPair} = {pairPoolData.firstOfPair == 'BTC' ? Number((pairPoolData.firstOfPairPrice).toFixed(4)) : pairPoolData.firstOfPairPrice} {pairPoolData.secondOfPair}</PairPrice>

            <StyledImage width={"12px"} height={"12px"}  src={images[pairPoolData.secondOfPair.toLowerCase()]} alt={pairPoolData.secondOfPair}  />
          </div>
          <PairPriceSeparator />
          <div style={{flex: 1, display: 'flex', justifyContent: 'flex-start'}}>
            <StyledImage width={"12px"} height={"12px"}  src={images[pairPoolData.secondOfPair.toLowerCase()]} alt={pairPoolData.secondOfPair}  />
            <PairPrice>1 {pairPoolData.secondOfPair} = {pairPoolData.secondOfPair == 'BTC' ? Number((pairPoolData.secondOfPairPrice).toFixed(4)) : pairPoolData.secondOfPairPrice} {pairPoolData.firstOfPair}</PairPrice>
            <StyledImage width={"12px"} height={"12px"}  src={images[pairPoolData.firstOfPair.toLowerCase()]} alt={pairPoolData.firstOfPair}  />
          </div>
        </PairPrices>

        {/*<InfoWrapper>
          <InfoTitle>providing wallets</InfoTitle> 
          <Info>{pairPoolProviderWallets.length}</Info>
        </InfoWrapper>*/}
        
        <InfoWrapper>
          <InfoTitle>{pairPoolData.firstOfPair.toLowerCase()}</InfoTitle>
          <Info>
          {
            displayPairBalance(pairPoolData.firstOfPair, pairPoolData.firstOfPairBalance, pairPoolData.decimalsOfFirstPair)
          }
        </Info>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>{pairPoolData.secondOfPair.toLowerCase()}</InfoTitle> 
          <Info>
          {
            displayPairBalance(pairPoolData.secondOfPair, pairPoolData.secondOfPairBalance, pairPoolData.decimalsOfSecondPair)
          }
          </Info>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>pool asset name</InfoTitle> 
          <Info>{pairPoolData.poolAssetName}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>pool asset id</InfoTitle> 
          <Info>{pairPoolData.poolAssetId}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>issued pool asset</InfoTitle> 
          <Info>{pairPoolData.poolAssetBalance.toLocaleString('en-US', {maximumFractionDigits: 4})}</Info>
        </InfoWrapper>

        <TopProviders>
          <TopProvidersTitle>
            Top 10 Liquidity Providers
          </TopProvidersTitle>
          {
            pairPoolProviderWallets.slice(0, 10).map((pairPoolProviderWallet, idx) => {
              return (
                <Fragment key={Object.keys(pairPoolProviderWallet)[0]}>
                  <WalletOrder order={idx+1}>{idx + 1}</WalletOrder>
                  <WalletAddress>{Object.keys(pairPoolProviderWallet)[0]}</WalletAddress>
                  <WalletBalance>{pairPoolProviderWallet[Object.keys(pairPoolProviderWallet)[0]].toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4})}</WalletBalance>
                </Fragment>
              );
            })
          }
        </TopProviders>
      </article>
    </StyledPoolSummary>
  )
}


export { PoolSummary };