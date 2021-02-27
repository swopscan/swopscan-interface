import { useContext } from 'react';
import styled from 'styled-components';
import { Info as InfoSVG } from 'react-feather';
import { PoolDataContext } from '../../App';
import * as images from '../../assets/images';

import GovernanceTreasury from './GovernanceTreasury';


const StyledHomeScreen = styled.main`
  grid-area: content;
`;

const TotalLiquidityWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14.75em, 1fr));
  gap: 1em;
`;

const TotalLiquidity = styled.header`
  padding: 12px;
  border: 2px solid ${({theme}) => theme.colors.secondary};
  border-radius: 5px;

  h2 {
    font-size: 1.1em;
    color: #fff;
    letter-spacing: 1px;
    border: 2px solid ${({theme}) => theme.colors.secondary};
    background-color: ${({theme}) => theme.colors.secondary};
    border-right: none;
    border-top: none;
    text-align: center;
    margin-top: -12px;
    margin-right: -13px;
    margin-left: 38%;
    padding: 3px;
    border-bottom-left-radius: 5px;

    @media ${({theme}) => theme.mediaQueries.main.adjust} {
      font-size: 1em;
    }
  }
`;
        
const StyledInfo = styled.p`
  display: grid;
  grid-template-columns: 1.2em 1fr;
  gap: 5px;
  font-size: 1.1em;
  letter-spacing: 1px;
  word-spacing: 1px;
`;

const Info = styled(InfoSVG)`
  width: 22px;
  height: 22px;
  color: ${({theme}) => theme.colors.main}
`;

const AllAssets = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
`;

const AllAssetTitle = styled.h2`
  grid-column: 1 / -1;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 5px;
  padding: 12px;
  margin: 0;
  font-size: 1em;
  letter-spacing: 2px;
  color: #fff;
`;

const Asset = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({theme}) => theme.colors.secondary};
  border-radius: 5px;
  padding: 12px;
  font-size: 1.1em;
  letter-spacing: 2px;
`;


function HomeScreen() {
  const [poolData, poolProviderWallets, pricesInUSDN, pricesInWAVES, stakedSwopAmount] = useContext(PoolDataContext);

  function calculateProvidedLiquidity() {
    let liquidityInUSDN = 0;
    let liquidityInWAVES = 0;

    function calculateTotalLiquidity(currency, firstOfPair, secondOfPair, firstOfPairBalance, secondOfPairBalance, usdnStakingBalance, eurnStakingBalance, nsbtStakingBalance) {
      const stakedAssets = {
        names: ['USDN', 'EURN', 'NSBT'],
        USDN: usdnStakingBalance,
        EURN: eurnStakingBalance,
        NSBT: nsbtStakingBalance
      };

      function calculate(pair, pairBalance) {
        if(pair == currency) {
          return (currency == 'USDN' ? pairBalance + stakedAssets[pair] : pairBalance);
        } else if(stakedAssets.names.includes(pair)) {
          return (pairBalance + stakedAssets[pair]) * (currency == 'USDN' ? pricesInUSDN[pair] : pricesInWAVES[pair]);
        } else {
          return pairBalance * (currency == 'USDN' ? pricesInUSDN[pair] : pricesInWAVES[pair]);
        }
      }

      return Number((calculate(firstOfPair, firstOfPairBalance) + calculate(secondOfPair, secondOfPairBalance)).toFixed(6));
    }
    poolData.forEach(pairPoolData => {
      liquidityInUSDN += calculateTotalLiquidity('USDN', pairPoolData.firstOfPair, pairPoolData.secondOfPair, pairPoolData.firstOfPairBalance, pairPoolData.secondOfPairBalance, pairPoolData.usdnStakingBalance, pairPoolData.eurnStakingBalance, pairPoolData.nsbtStakingBalance);
    });
    poolData.forEach(pairPoolData => {
      liquidityInWAVES += calculateTotalLiquidity('WAVES', pairPoolData.firstOfPair, pairPoolData.secondOfPair, pairPoolData.firstOfPairBalance, pairPoolData.secondOfPairBalance, pairPoolData.usdnStakingBalance, pairPoolData.eurnStakingBalance, pairPoolData.nsbtStakingBalance);
    });

    return {inUSDN: Number(liquidityInUSDN.toFixed(6)), inWAVES: Number(liquidityInWAVES.toFixed(8))};
  }
  const providedLiquidity = calculateProvidedLiquidity();

  const uniqueWallets = poolProviderWallets.uniqueWallets;

  function calculateStakedAssets(asset) {
    let totalStaked = 0;
    let total = 0;
    poolData.forEach(pairPoolData => {
      totalStaked += pairPoolData[`${asset.toLowerCase()}StakingBalance`];
      if(pairPoolData.firstOfPair == asset) {
        total = totalStaked + pairPoolData.firstOfPairBalance;
      }
      if(pairPoolData.secondOfPair == asset) {
        total = totalStaked + pairPoolData.secondOfPairBalance;
      }
    });
    return {total, totalStaked: totalStaked.toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4})};
  }
  let { total: totalUSDN, totalStaked: totalStakedUSDN} = calculateStakedAssets('USDN');
  let { total: totalEURN, totalStaked: totalStakedEURN} = calculateStakedAssets('EURN');
  let { total: totalNSBT, totalStaked: totalStakedNSBT} = calculateStakedAssets('NSBT');

  const providedAssets = {};
  poolData.forEach(pairPoolData => {
    if(!providedAssets[pairPoolData.firstOfPair]) {
      providedAssets[pairPoolData.firstOfPair] = Number(pairPoolData.firstOfPairBalance.toFixed(pairPoolData.decimalsOfFirstPair));
    } else {
      providedAssets[pairPoolData.firstOfPair] = Number((providedAssets[pairPoolData.firstOfPair] + pairPoolData.firstOfPairBalance).toFixed(pairPoolData.decimalsOfFirstPair));
    }

    if(!providedAssets[pairPoolData.secondOfPair]) {
      providedAssets[pairPoolData.secondOfPair] = Number(pairPoolData.secondOfPairBalance.toFixed(pairPoolData.decimalsOfSecondPair));
    } else {
      providedAssets[pairPoolData.secondOfPair] = Number((providedAssets[pairPoolData.secondOfPair] + pairPoolData.secondOfPairBalance).toFixed(pairPoolData.decimalsOfSecondPair));
    }
  });
  providedAssets.USDN = totalUSDN;
  providedAssets.EURN = totalEURN;
  providedAssets.NSBT = totalNSBT;

  return (
    <StyledHomeScreen>
      <aside>
        <StyledInfo>
          <Info />
          swopscan, currently tracks 13 of 13 swop.fi liquidity pools.
        </StyledInfo>
      </aside>

      <TotalLiquidityWrapper>
        <TotalLiquidity token="USDN" amount={providedLiquidity.inUSDN}>
          <h2>Total Liquidity</h2>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={images.usdn} alt="usdn" style={{width: 36, height: 36}} />
            <p style={{fontSize: '1.2em', fontWeight: 'bold', letterSpacing: '1px', marginLeft: 10}}>{Number(providedLiquidity.inUSDN.toFixed()).toLocaleString()} <small style={{fontWeight: 'normal'}}>usdn</small></p>
          </div>
        </TotalLiquidity>
        <TotalLiquidity token="WAVES" amount={providedLiquidity.inWAVES}>
          <h2>Total Liquidity</h2>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={images.waves} alt="waves" style={{width: 36, height: 36}} />
            <p style={{fontSize: '1.2em', fontWeight: 'bold', letterSpacing: '1px', marginLeft: 10}}>{Number(providedLiquidity.inWAVES.toFixed()).toLocaleString()} <small style={{fontWeight: 'normal'}}>waves</small></p>
          </div>
        </TotalLiquidity>
      </TotalLiquidityWrapper>

      <article>
        <StyledInfo>
          <Info />
          {uniqueWallets} wallets are providing liquidity.
        </StyledInfo>
        <StyledInfo>
          <Info />
          {stakedSwopAmount.toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4})} SWOP is being staked in the governance.
        </StyledInfo>
        <StyledInfo>
          <Info />
          {totalStakedUSDN} USDN is being staked.
        </StyledInfo>
        <StyledInfo>
          <Info />
          {totalStakedEURN} EURN is being staked.
        </StyledInfo>
        <StyledInfo>
          <Info />
          {totalStakedNSBT} NSBT is being staked.
        </StyledInfo>
      </article>

      <AllAssets>
        <AllAssetTitle>Liquidity By Assets</AllAssetTitle>
        {
          Object.keys(providedAssets).map(assetName => {
            return (
              <Asset key={assetName}>
                <img src={images[assetName.toLowerCase()]} alt={assetName} style={{width: 30, height: 30, marginRight: 5}} />
                {providedAssets[assetName].toLocaleString('en-US', {maximumFractionDigits: 0})} {assetName.toLowerCase()}
              </Asset>
            );
          })
        }
      </AllAssets>

      <GovernanceTreasury />
    </StyledHomeScreen>
  )
}


export { HomeScreen };