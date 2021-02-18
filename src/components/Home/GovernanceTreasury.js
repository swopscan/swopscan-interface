import { memo, useReducer, useEffect } from 'react';
import styled from 'styled-components'

import { nodeURL, assets } from '../../data/addresses';
import * as images from '../../assets/images';


const StyledGovernanceTreasury = styled.article`
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
`;

const Title = styled.h2`
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


const initialState = {
  governanceBalance: null,
  error: false,
  loading: true
};
function reducer(state, action) {
  switch(action.type) {
    case 'SUCCESS':
      return {governanceBalance: action.payload, error: false, loading: false};
    case 'ERROR':
      return {governanceBalance: null, error: true, loading: false};
    default:
      return state;
  }
}


function GovernanceTreasury() {
  const assetAddresses = Object.keys(assets);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function getAssetBalances() {
      try {
        const response = await fetch(`${nodeURL}/assets/balance/3P6J84oH51DzY6xk2mT5TheXRbrCwBMxonp`);
        const governanceBalances = (await response.json()).balances;
        const governanceAssets = {};
        governanceBalances.forEach(governanceBalance => {
          if(assetAddresses.includes(governanceBalance.assetId)) {
            governanceAssets[assets[governanceBalance.assetId].name] = governanceBalance.balance / 10**assets[governanceBalance.assetId].decimals;
          }
        });
        return governanceAssets;
      } catch {
        dispatch({type: 'ERROR'});
      }
    }
    async function getWavesBalance() {
      try {
        const response = await fetch(`${nodeURL}/addresses/balance/3P6J84oH51DzY6xk2mT5TheXRbrCwBMxonp`);
        const wavesBalance = await response.json();
        return wavesBalance.balance / 10**8;
      } catch {
        dispatch({type: 'ERROR'});
      }
    }
    Promise.all([getAssetBalances(), getWavesBalance()])
      .then(function combineAssetBalances([assetBalances, wavesBalance]) {
        assetBalances.waves = wavesBalance;
        dispatch({type: 'SUCCESS', payload: assetBalances});
      })
      .catch(() => {
        dispatch({type: 'ERROR'});
      })
  }, []);

  return (
    <>
      {
        state.loading ?
          null :
          state.error ?
            null :
            <StyledGovernanceTreasury>
              <Title>Governance Treasury</Title>
              {
                Object.keys(state.governanceBalance).map(assetName => {
                  return (
                    <Asset key={assetName}>
                      <img src={images[assetName]} alt={assetName} style={{width: 20, height: 20, marginRight: 5}} />
                      {state.governanceBalance[assetName].toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 6})} {assetName}
                    </Asset>
                  );
                })
              }
            </StyledGovernanceTreasury>
        }
    </>
  )
}

export default memo(GovernanceTreasury);