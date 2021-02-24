import styled from 'styled-components';
import { Pie } from 'react-chartjs-2'
import { useContext } from 'react';
import { PoolDataContext } from '../../App';
import { Info as InfoSVG } from 'react-feather';

const StyledInfo = styled.p`
  display: grid;
  grid-template-columns: 1.2em 1fr;
  gap: 5px;
  font-size: 1.1em;
  letter-spacing: 1px;
  word-spacing: 1px;
  padding: 1em;
  padding-top: 0;
`;

const Info = styled(InfoSVG)`
  width: 22px;
  height: 22px;
  color: rgba(60, 179, 113, 0.7);
`;

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

function refactorNumber(number) {
  const dotIndex = String(number).indexOf('.');
  const newString = String(number).slice(0, (dotIndex + 3));
  return Number(newString);
}

function WalletSummary({balances, stakedSwop}) {
  const [poolData, , pricesInUSDN] = useContext(PoolDataContext);

  
  const data = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  }

  const backgroundColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(105, 172, 172, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(215, 99, 64, 0.6)',
    'rgba(248, 149, 248, 0.6)',
    'rgba(150, 97, 100, 0.6)',
    'rgba(248, 62, 171, 0.6)',
    'rgba(30, 60, 70, 0.6)',
    'rgba(113, 252, 95, 0.6)',
    'rgba(119, 119, 119, 0.6)',
  ];
  const borderColors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(105, 172, 172)',
    'rgb(153, 102, 255)',
    'rgb(215, 99, 64)',
    'rgb(248, 149, 248)',
    'rgb(150, 97, 100)',
    'rgb(248, 62, 171)',
    'rgb(30, 60, 70)',
    'rgb(113, 252, 95)',
    'rgb(119, 119, 119)',
  ];
  let colorIndex = 0;

  
  function balanceCalculator({pair, totalQuantity, decimals, walletBalance}) {
    const pairPoolData = poolData.find(pairPoolData => pairPoolData.poolPair == pair);

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
    
    const walletPairValue = (walletValueFirstOfPair * (pairPoolData.firstOfPair == 'USDN' ? 1 : pricesInUSDN[pairPoolData.firstOfPair])) + (walletValueSecondOfPair * (pairPoolData.secondOfPair == 'USDN' ? 1 : pricesInUSDN[pairPoolData.secondOfPair]));
    data.labels.push(pair);
    data.datasets[0].data.push(refactorNumber(walletPairValue));
    data.datasets[0].backgroundColor.push(backgroundColors[colorIndex]);
    data.datasets[0].borderColor.push(borderColors[colorIndex++]);
    return {
      pair: pair,
      value: walletPairValue
    };
  }

  const walletValues = [];
  balances.slice(1).forEach(pairDetails => {
    if(pairDetails.walletBalance !== 0 ) {
      walletValues.push(balanceCalculator(pairDetails));
    }
  });

  if(stakedSwop.stakedSwop !== 0) {
    data.labels.push('STAKED SWOP');
    data.datasets[0].data.push(refactorNumber(stakedSwop.stakedSwop * pricesInUSDN.SWOP));
    data.datasets[0].backgroundColor.push('rgba(60, 179, 113, 0.6)');
    data.datasets[0].borderColor.push('rgba(60, 179, 113)');
  }

  //

  return (
    <StyledWalletPoolDetail>
      <TitleWrapper>
        <StyledTitle>WALLET SUMMARY</StyledTitle>
      </TitleWrapper>
      <StyledInfo>
        <Info />
        {stakedSwop.stakedSwop.toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4})} SWOP({(stakedSwop.stakedSwop * pricesInUSDN.SWOP).toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4})} USDN) is being staked in the governance.
      </StyledInfo>
      <StyledInfo>
        <Info />
        {
          walletValues.reduce(function(accumulator, pair) {
            return accumulator + pair.value
          }, 0)
          .toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4})
        } USDN is provided as liquidity.
      </StyledInfo>
      <Pie data={data} />
    </StyledWalletPoolDetail>
  );
}


export { WalletSummary };