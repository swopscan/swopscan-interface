import { useContext } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { PoolDataContext } from '../../App';
import { trophy } from '../../assets/images';


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
`;

const DetailsWrapper = styled.div`
  display: flex;

  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledData = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.secondary};
  border-right: none;
  border-radius: 3px;
  padding: 4px;
  padding-right: 0;
  margin-bottom: 4px;
  margin-top: 4px;
  margin-right: -9px;

  p {
    margin: 0;
    font-size: 1em;
    letter-spacing: 1px;
    word-spacing: 1px;
    flex: 1;
  }

  :hover p {
    color: ${({theme}) => theme.colors.blue};
  }
`;

const StyledWalletPoolDetail = styled.article`
  border: 2px solid ${({theme}) => theme.colors.secondary};
  padding: 8px;
  padding-left: 0;
  border-radius: 5px;
  margin-bottom: 0.75em;
`;

const ChartWrapper = styled.div`
  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

const DataWrapper = styled.div`
  margin-left: 4px; 
  flex-grow: 1;
`;


function refactorNumber(number) {
  return number.toLocaleString('en-US', {maximumFractionDigits: 4});
}


function WalletPoolDetail({pair, totalQuantity, walletBalance, stakedBalance, nonStakedBalance, decimals, walletAddress}) {
  const [poolData, poolProviderWallets] = useContext(PoolDataContext);
  const pairPoolData = poolData.find(pairPoolData => pairPoolData.poolPair == pair);

  function walletRankFinder(pair) {
    const allWalletsOfPoolAsset = poolProviderWallets[pair].map(poolProviderWallet => {
      return Object.keys(poolProviderWallet)[0];
    });
    const walletRank = allWalletsOfPoolAsset.indexOf(walletAddress) + 1;
    return walletRank;
  }
  
  const walletValue = (function caculateWalletValueOfPairs() {
    const stakedAssets = {
      names: ['USDN', 'EURN', 'NSBT'],
      USDN: pairPoolData.usdnStakingBalance,
      EURN: pairPoolData.eurnStakingBalance,
      NSBT: pairPoolData.nsbtStakingBalance
    };

    const totalFirstOfPairBalance = (
      stakedAssets.names.includes(pairPoolData.firstOfPair) ? 
        pairPoolData.firstOfPairBalance + stakedAssets[pairPoolData.firstOfPair] :
        pairPoolData.firstOfPairBalance
    );
    const totalSecondOfPairBalance = (
      stakedAssets.names.includes(pairPoolData.secondOfPair) ? 
        pairPoolData.secondOfPairBalance + stakedAssets[pairPoolData.secondOfPair] :
        pairPoolData.secondOfPairBalance
    );

    const perAssetBalanceOfFirstOfPair = totalFirstOfPairBalance / (totalQuantity / (10 ** decimals));
    const perAssetBalanceOfSecondOfPair = totalSecondOfPairBalance / (totalQuantity / (10 ** decimals));
    const walletValueFirstOfPair = perAssetBalanceOfFirstOfPair * (walletBalance / (10 ** decimals));
    const walletValueSecondOfPair = perAssetBalanceOfSecondOfPair * (walletBalance / (10 ** decimals));
    
    return {
      firstOfPair: walletValueFirstOfPair, 
      secondOfPair: walletValueSecondOfPair
    }
  })();

  const data = [
    { name: 'WALLET', value: Number((walletBalance/(10**decimals)).toFixed(1)) },
    { name: 'TOTAL', value: Number((totalQuantity/(10**decimals)).toFixed(1)) }
  ];
  const COLORS = ['#0055FF', '#3cb371'];

  return (
    <StyledWalletPoolDetail>
      <TitleWrapper>
        <StyledTitle>{pair}</StyledTitle>
      </TitleWrapper>
      <DetailsWrapper>
        <ChartWrapper>
          <PieChart width={240} height={150}>  
            <Pie dataKey="value" data={data} cx={130} cy={90} startAngle={180} endAngle={0} innerRadius={36} outerRadius={48} fill="#8884d8" paddingAngle={5} label>
              {
                data.map((entry, index) => <Cell key={pair} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartWrapper>
        {
          Object.is(walletBalance, 0) ?
            (
              <DataWrapper>
                <StyledData><p>{refactorNumber((totalQuantity)/(10**decimals))}</p> <p>total issued</p></StyledData>
                <StyledData><p>0</p> <p>wallet balance</p></StyledData>
              </DataWrapper>
            ) :
            (
              <DataWrapper>
                <StyledData><p>{refactorNumber((totalQuantity)/(10**decimals))}</p> <p>total issued</p></StyledData>
                <StyledData><p>{refactorNumber((walletBalance)/(10**decimals))}</p> <p>wallet balance</p></StyledData>
                <StyledData><p>{refactorNumber((stakedBalance)/(10**decimals))}</p> <p>staked balance</p></StyledData>
                {/*according to community need we can re-add<StyledData><p>{refactorNumber((nonStakedBalance)/(10**decimals))}</p> <p>stakeable balance</p></StyledData>*/}
                <StyledData><p>{((walletBalance / totalQuantity)*100).toFixed(4)}% </p><p>wallet share</p></StyledData>
                {/*with stable version -> <StyledData><p>{walletRankFinder(pair) == 1 ? <img src={trophy} alt="trophy" width="16px" height="16px" /> : null} {walletRankFinder(pair)} </p><p>rank</p></StyledData>*/}
                <StyledData><p>{refactorNumber(walletValue.firstOfPair)}</p> <p>{pairPoolData.firstOfPair.toLowerCase()}</p></StyledData>
                <StyledData><p>{refactorNumber(walletValue.secondOfPair)} </p> <p>{pairPoolData.secondOfPair.toLowerCase()}</p></StyledData>
              </DataWrapper>
            )
          }
      </DetailsWrapper>
    </StyledWalletPoolDetail>
  );
}


export { WalletPoolDetail };