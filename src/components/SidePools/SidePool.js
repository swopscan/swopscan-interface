import { useContext, memo } from 'react';
import styled from 'styled-components';
import { Repeat } from 'react-feather';
import { PoolDataContext } from '../../App';
import * as images from '../../assets/images';


const StyledImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
`;

const SidePoolData = styled.p`
  grid-column: 1 / -1;
  justify-self: center;
  display: flex;
  font-weight: bold;
  font-size: 1.2em;
  letter-spacing: 1px;
  margin-bottom: 0;
`;

const StyledSidePool = styled.li`
  padding: 12px;
  margin-bottom: 0.75em;
  display: grid;
  grid-template-columns: 50px 24px 50px;
  justify-content: center;
  border: 2px solid ${props => props.id === props.pool ? props.theme.colors.secondary : props.theme.colors.main};
  border-radius: 5px;
  cursor: pointer;

  :hover {
    border-color: ${({theme}) => theme.colors.secondary};
  }

  :focus {
    outline-color: ${({theme}) => theme.colors.secondary};
    border-color: ${({theme}) => theme.colors.secondary}
  }
`;


function SidePool({firstOfPair, secondOfPair, id, pool, choosePool, showHomeScreen, showWallet}) {
  const [poolData,,pricesInUSDN] = useContext(PoolDataContext);
  const pairPoolData = poolData.find(pairPoolData => pairPoolData.poolPair == id);

  function calculateProvidedLiquidity(firstOfPair, secondOfPair, firstOfPairBalance, secondOfPairBalance, usdnStakingBalance, eurnStakingBalance, nsbtStakingBalance) {
    const stakedAssets = {
      names: ['USDN', 'EURN', 'NSBT'],
      USDN: usdnStakingBalance,
      EURN: eurnStakingBalance,
      NSBT: nsbtStakingBalance
    };
    function calculate(pair, pairBalance) {
      if(pair == 'USDN') {
        return pairBalance + stakedAssets[pair];
      } else if(stakedAssets.names.includes(pair)) {
        return (pairBalance + stakedAssets[pair]) * pricesInUSDN[pair];
      } else {
        return pairBalance * pricesInUSDN[pair];
      }
    }
    let firstOfPairValueInUSDN = calculate(firstOfPair, firstOfPairBalance);
    let secondOfPairValueInUSDN = calculate(secondOfPair, secondOfPairBalance);

    return Number((firstOfPairValueInUSDN + secondOfPairValueInUSDN).toFixed(0));
  }
  const providedLiquidity = calculateProvidedLiquidity(pairPoolData.firstOfPair, pairPoolData.secondOfPair, pairPoolData.firstOfPairBalance, pairPoolData.secondOfPairBalance, pairPoolData.usdnStakingBalance, pairPoolData.eurnStakingBalance, pairPoolData.nsbtStakingBalance);

  return (
    <StyledSidePool 
      id={id} 
      pool={pool}
      onClick={() => {
        choosePool(id); 
        showHomeScreen(false); 
        showWallet(false);
        window.scroll({
          top: 0, 
          left: 0, 
          behavior: 'smooth'
        });        
        }
      }
      tabIndex={0}
      aria-label={`${firstOfPair} ${secondOfPair} liquidity pool`}
    >
      <StyledImage src={images[firstOfPair]} alt={firstOfPair}  />
      <Repeat size={12} color="mediumseagreen" style={{justifySelf: 'center', alignSelf: 'center'}} />
      <StyledImage src={images[secondOfPair]} alt={secondOfPair} style={{justifySelf: 'end'}} />
      <SidePoolData>
        <img style={{width: 18, height: 18, marginRight: 4}} src={images.usdn} alt={'usdn'} />
        {typeof providedLiquidity == 'number' && !Object.is(providedLiquidity, NaN) ? providedLiquidity.toLocaleString() : 'calculation error'}
      </SidePoolData>
    </StyledSidePool>
  )
}


export default memo(SidePool);