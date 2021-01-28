import { useState, useEffect } from 'react';
import { poolAssets, nodeURL } from '../data/addresses';


const concatenatedPoolAssetsAPIUrl = Object.keys(poolAssets).map(poolAssetName => poolAssets[poolAssetName].address).reduce((concatenatedURL, assetAddress) => concatenatedURL+'id='+assetAddress+'&', `${nodeURL}/assets/details?`);

function useFetchWallet(walletAddress) {
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
        return {pair, walletBalance: data.balance};
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
  
    //Combining wallet pool tokens and total issued pool tokens.
    Promise.all([fetchedWalletBalances, fetchedTotalBalances])
      .then(([walletBalances, totalBalances]) => {
        const walletAndTotalPoolAsset = [];
        walletBalances.forEach((walletBalance, idx) => {
          walletAndTotalPoolAsset.push({...walletBalance, ...totalBalances[idx]});
        });
        setBalances(walletAndTotalPoolAsset);
        setLoading(false);
      })
      .catch(errorCatcher)

  }, [walletAddress]);

  return [balances, loading, isError];
}


export { useFetchWallet };