import { useState, useEffect } from 'react';
import { poolAssets, nodeURL } from '../data/addresses';


const concatenatedPoolAssetsAPIUrl = Object.keys(poolAssets).map(poolAssetName => poolAssets[poolAssetName].address).reduce((concatenatedURL, assetAddress) => concatenatedURL+'id='+assetAddress+'&', `${nodeURL}/assets/details?`);

function FetchWalletData(walletAddress) {
  const [loading, setLoading] = useState(true);
  const [balances, setBalances] = useState();
  const [isError, setIsError] = useState(false);

  //catch helper
  function errorCatcher(error) {
    setIsError(true);
    setLoading(false);
  }

  useEffect(() => {
    setIsError(false);
    setLoading(true);

    //for each call of "fetchWalletBalance" we fetch the "walletAddress"' related asset, we fetch for all of the "poolAssets" pool assets
    //using this API: "https://nodes.wavesnodes.com/api-docs/index.html#/assets/balance"
    async function fetchWalletBalance({url, pair}) {
      try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('Unknown but certainly caught error!');
        const data = await response.json();
        return {pair, walletBalance: data.balance, nonStakedBalance: data.balance, stakedBalance: 0};
      } catch(error) {
        throw new Error(error);
      }
    }
    const fetchedWalletBalances = Promise.all([
      ...Object.keys(poolAssets).map(poolAssetName => fetchWalletBalance({url: `${nodeURL}/assets/balance/${walletAddress}/${poolAssets[poolAssetName].address}`, pair: poolAssetName}))
    ])
    .catch(errorCatcher);
  
    //using "concatenatedPoolAssetsAPIUrl" and it fetches the details of "poolAssets" pool assets.
    //using this API: "https://nodes.wavesnodes.com/api-docs/index.html#/assets/asset_details_array"
    async function fetchTotalBalance(url) {
      try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('Unknown but certainly caught error!');
        const pairTokens = await response.json();
        return pairTokens.map(pairToken => ({totalQuantity: pairToken.quantity, decimals: pairToken.decimals, name: pairToken.name}));
      } catch(error) {
        throw error;
      }
    }
    const fetchedTotalBalances = fetchTotalBalance(concatenatedPoolAssetsAPIUrl).catch(errorCatcher);

  
    //using this API: "https://nodes.wavesnodes.com/api-docs/index.html#/addresses/getData_1"
    async function fetchStakedAssets() {
      try {
        const response = await fetch(`${nodeURL}/addresses/data/3P73HDkPqG15nLXevjCbmXtazHYTZbpPoPw?matches=.%2A${walletAddress}.%2A`);
        const data = await response.json();
        const stakedAssets = {};
        for(let i = 0; i < data.length; i++) {
          if(data[i].key.includes('share_tokens_locked')) {
            const pool = data[i].key.slice(0, 35);
            const poolAssetName = Object.values(poolAssets).find(poolAsset => poolAsset.pool == pool).name;
            const balance = data[i].value;
            stakedAssets[poolAssetName] = balance;
          }
        }
        return stakedAssets;
      } catch(error) {
        throw new Error(error);
      }
    }
    const fetchedStakedAssets = fetchStakedAssets().catch(errorCatcher); 

    //using this API: "https://nodes.wavesnodes.com/api-docs/index.html#/addresses/getData_1"
    async function fetchStakedSwop() {
      try {
        const response = await fetch(`${nodeURL}/addresses/data/3PLHVWCqA9DJPDbadUofTohnCULLauiDWhS?matches=.%2A${walletAddress}.%2A`);
        const data = await response.json();
        const stakedSwop = {stakedSwop: 0};
        for(let i = 0; i < data.length; i++) {
          if(data[i].key == `${walletAddress}_SWOP_amount`) {
            stakedSwop.stakedSwop = data[i].value / 10**8
          }
        }
        return stakedSwop;
      } catch(error) {
        throw new Error(error);
      }
    }
    const fetchedStakedSwop = fetchStakedSwop().catch(errorCatcher);

  
    //Combining wallet pool tokens and total issued pool tokens.
    Promise.all([fetchedWalletBalances, fetchedTotalBalances, fetchedStakedAssets, fetchedStakedSwop])
      .then(([walletBalances, totalBalances, stakedAssets, stakedSwop]) => {
        const walletAndTotalPoolAsset = [];
        walletBalances.forEach((walletBalance, idx) => {
          walletAndTotalPoolAsset.push({...walletBalance, ...totalBalances[idx]});
        });
        walletAndTotalPoolAsset.forEach(assetData => {
          if(Object.keys(stakedAssets).includes(assetData.name)) {
            assetData.stakedBalance = stakedAssets[assetData.name];
            assetData.walletBalance = assetData.walletBalance + stakedAssets[assetData.name];
          }
        });
        walletAndTotalPoolAsset.unshift(stakedSwop);
        setBalances(walletAndTotalPoolAsset);
        setLoading(false);
      })
      .catch(errorCatcher)

  }, [walletAddress]);
  return [balances, loading, isError];
}


export { FetchWalletData };