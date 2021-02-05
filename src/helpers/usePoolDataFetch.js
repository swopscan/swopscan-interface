import { useEffect, useReducer } from 'react';
import { pools, poolAssets, nodeURL } from '../data/addresses';
import { usdnPriceCalculator, wavesPriceCalculator } from './priceCalculators';


const initialState = {
  isError: false,
  loading: true,
  poolData: null,
  poolProviderWallets: null,
  pricesInUSDN: null,
  pricesInWAVES: null,
};

function reducer(currentState, action) {
  switch(action.type) {
    case 'DONE':
      return {
        isError: false, 
        loading: false,
        poolData: action.payload.poolData,
        poolProviderWallets: action.payload.poolProviderWallets,
        pricesInUSDN: action.payload.pricesInUSDN,
        pricesInWAVES: action.payload.pricesInWAVES,
      }
    case 'ERROR':
      return {...currentState, isError: true, loading: false};
    default: 
      return currentState;
  }
}

function usePoolDataFetch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //fetching pool balances in pairs and price calculation
  useEffect(() => {
    //helper
    function fetchSuccessHandler(response) {
      if(!response.ok) {
        throw new Error('Unknown but certainly caught error!, hopefully :)');
      }
      return response.json();
    }

    //fetching pair balances in all tracked pools(also usdn staking balance of the related pool if one of the pair is usdn) and returning along with some of the arguments. 
    //will merge with related-prices in all pools data which is coming from  "fetchAndCalculatePairPrices"
    async function fetchPoolData({poolAddress, firstOfPair, secondOfPair, firstOfPairAddress, secondOfPairAddress, decimalsOfFirstPair, decimalsOfSecondPair}, poolPair) {
      const stakedAssets = {
        names: ['USDN', 'EURN', 'NSBT'],
        USDN: {address: `${nodeURL}/addresses/data/3PNikM6yp4NqcSU8guxQtmR5onr2D4e8yTJ/rpd_balance_DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p`, decimals: 6},
        EURN: {address: `${nodeURL}/addresses/data/3PFhcMmEZoQTQ6ohA844c7C9M8ZJ18P8dDj/%25s%25s%25s__stakingBalance__DUk2YTxhRoAqMJLus4G2b3fR8hMHVh6eiyFx5r29VR6t_`, decimals: 6},
        NSBT: {address: `${nodeURL}/addresses/data/3PNikM6yp4NqcSU8guxQtmR5onr2D4e8yTJ/rpd_balance_6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g`, decimals: 6}
      };
      
      try {
          //using this API for WAVES: "https://nodes.wavesnodes.com/api-docs/index.html#/addresses/balance_3"
          //using this API for assets: "https://nodes.wavesnodes.com/api-docs/index.html#/assets/balance"
        let [firstOfPairBalance, secondOfPairBalance, usdnStakingBalance, eurnStakingBalance, nsbtStakingBalance] = await Promise.all([
          (firstOfPair == 'WAVES') ? 
            (fetch(`${nodeURL}/addresses/balance/${poolAddress}`)
              .then(fetchSuccessHandler)) : 
              (fetch(`${nodeURL}/assets/balance/${poolAddress}/${firstOfPairAddress}`)
                .then(fetchSuccessHandler)),
        
          (secondOfPair == 'WAVES') ? 
            (fetch(`${nodeURL}/addresses/balance/${poolAddress}`)
              .then(fetchSuccessHandler)) : 
              (fetch(`${nodeURL}/assets/balance/${poolAddress}/${secondOfPairAddress}`)
                .then(fetchSuccessHandler)),

          //using this API: "https://nodes.wavesnodes.com/api-docs/index.html#/addresses/getDataItem_1"
          ...stakedAssets.names.map(stakedAsset => {
            return firstOfPair == 'SWOP' ? undefined : (stakedAsset == firstOfPair || stakedAsset == secondOfPair) ?
              fetch(`${stakedAssets[stakedAsset].address}_${poolAddress}`)
                .then(fetchSuccessHandler) : 
                undefined
          })
        ]);

        firstOfPairBalance = (firstOfPairBalance.balance / (10**decimalsOfFirstPair));
        secondOfPairBalance = (secondOfPairBalance.balance / (10**decimalsOfSecondPair));
        usdnStakingBalance = usdnStakingBalance ? (usdnStakingBalance.value / (10**stakedAssets.USDN.decimals)) : 0;
        eurnStakingBalance = eurnStakingBalance ? (eurnStakingBalance.value / (10**stakedAssets.EURN.decimals)) : 0;
        nsbtStakingBalance = nsbtStakingBalance ? (nsbtStakingBalance.value / (10**stakedAssets.NSBT.decimals)) : 0;

        return {poolPair, poolAddress, firstOfPair, secondOfPair, firstOfPairAddress, secondOfPairAddress, decimalsOfFirstPair, decimalsOfSecondPair, firstOfPairBalance, secondOfPairBalance, usdnStakingBalance, eurnStakingBalance, nsbtStakingBalance};

      } catch(error) {
        dispatch({type: 'ERROR'});
      }
    }
    const poolDataFetches = Promise.all([
      ...Object.keys(pools).map(poolPair => fetchPoolData({...pools[poolPair]}, poolPair))
    ])
    .catch(error => {
      dispatch({type: 'ERROR'});
    });
  
    //

    //will be merged with "poolDataFetches"
    async function fetchAndCalculatePairPrices({poolAddress, firstOfPair, secondOfPair, firstOfPairAddress, secondOfPairAddress, decimalsOfFirstPair, decimalsOfSecondPair}, limit) {
      try {
        //finding the pair name from the asset id, check firstOfExchnagedPair
        const assetMatcher = {[firstOfPairAddress]: firstOfPair, [secondOfPairAddress]: secondOfPair};

        //finding the decimal for the exchanged asset, check firstOfExchnagedPairAmount
        const decimalsMatcher = {[firstOfPair]: decimalsOfFirstPair, [secondOfPair]: decimalsOfSecondPair}; 

        //fetch the recent transactions on the pool, detect the exchange one, if you can't find in the current batch run again.
        //using this API: "https://nodes.wavesnodes.com/api-docs/index.html#/transactions/addressLimit_1"
        let pagination = false;
        let paginationId;
        async function getLatestExchangeTransaction() {
          try {
            let transactions;
            if(!pagination) {
              transactions = await fetch(`${nodeURL}/transactions/address/${poolAddress}/limit/${limit}`)
                .then(fetchSuccessHandler)
            } else {
              transactions = await fetch(`${nodeURL}/transactions/address/${poolAddress}/limit/${limit}?after=${paginationId}`)
                .then(fetchSuccessHandler)
            }
            paginationId = transactions[0][transactions.length - 1].id;

            const latestExchangeTransaction = transactions[0].find(transaction => {
              if(transaction.type == 16 && transaction.call.function == 'exchange') {
                return transaction;
              } 
              return false;
            });

            if(!latestExchangeTransaction) {
              pagination = true;
              return await getLatestExchangeTransaction();
            } else {
              return latestExchangeTransaction;
            }
          } catch(error) {
            dispatch({type: 'ERROR'});
          }
        }
        const latestExchangeTransaction = await getLatestExchangeTransaction();

        //calculate related-prices for a pair in all tracked pools by using the latestExchangeTransaction in each related pool.
        const firstOfExchangedPair = assetMatcher[latestExchangeTransaction.payment[0].assetId ?? 'WAVES'];
        const secondOfExchangedPair = firstOfExchangedPair == firstOfPair ? secondOfPair : firstOfPair;
        const firstOfExchangedPairAmount = (latestExchangeTransaction.payment[0].amount) / (10**decimalsMatcher[firstOfExchangedPair]);
        const secondOfExchangedPairAmount = (latestExchangeTransaction.stateChanges.transfers[0].amount + latestExchangeTransaction.stateChanges.transfers[1].amount) / (10**decimalsMatcher[secondOfExchangedPair]);
        const firstOfPairPrice = Number((secondOfExchangedPairAmount / firstOfExchangedPairAmount).toFixed(6));
        const secondOfPairPrice = Number((firstOfExchangedPairAmount / secondOfExchangedPairAmount).toFixed(6));

        if(firstOfPair != firstOfExchangedPair) {
          return {'firstOfPairPrice': secondOfPairPrice, 'secondOfPairPrice': firstOfPairPrice};
        } else if(firstOfPair = firstOfExchangedPair) {
          return {'firstOfPairPrice': firstOfPairPrice, 'secondOfPairPrice': secondOfPairPrice};
        }
      } catch(error) {
        dispatch({type: 'ERROR'});
      }
    }
    const poolPairPriceFetches = Promise.all([
      ...Object.keys(pools).map(poolPair => fetchAndCalculatePairPrices({...pools[poolPair]}, 15))
    ])
    .catch(error => {
      dispatch({type: 'ERROR'});
    });

    //

    //will be merged with "fetchAndCalculatePairPrices" and "poolDataFetches"
    //API: "https://nodes.wavesnodes.com/api-docs/index.html#/assets/asset_details_array"
    const concatenatedPoolAssetsAPIUrl = Object.keys(poolAssets).map(poolAssetName => poolAssets[poolAssetName].address).reduce((concatenatedURL, assetAddress) => concatenatedURL+'id='+assetAddress+'&', `${nodeURL}/assets/details?`);
    async function fetchPoolAssets(url) {
      try {
        const poolAssets = await fetch(concatenatedPoolAssetsAPIUrl)
          .then(fetchSuccessHandler);
        return poolAssets.map(poolAsset => ({poolAssetBalance: (poolAsset.quantity / (10 ** poolAsset.decimals)), poolAssetName: poolAsset.name, poolAssetId: poolAsset.assetId}));
      } catch(error) {
        dispatch({type: 'ERROR'});
      }
    }
    const fetchedPoolAssetBalance = fetchPoolAssets();

    //
    
    async function fetchLiquidityProviderWallets() {
      try {
        //first things first get the block height
        //API : "https://nodes.wavesnodes.com/api-docs/index.html#/blocks/height_1"
        let blockHeight = await fetch(`${nodeURL}/blocks/height`)
          .then(fetchSuccessHandler);
        blockHeight = blockHeight.height - 1;
        
        //let's fetch the wallets which have pool assets.
        //API : "https://nodes.wavesnodes.com/api-docs/index.html#/assets/balanceDistributionAtHeight_1"
        let poolAttendances = {};
        let pagination = false;
        let paginationId;
        let wallets = [];
        async function fetchWalletsOfEachAsset(poolAssetName, poolAssetAddress, limit) {
          try {
            if(!pagination) {
              const fetchedWallets = (
                await fetch(`${nodeURL}/assets/${poolAssetAddress}/distribution/${blockHeight}/limit/${limit}`)
                .then(fetchSuccessHandler)
              );
              wallets.push(fetchedWallets.items);
              paginationId = fetchedWallets.lastItem;
              pagination = fetchedWallets.hasNext;
            } else if(pagination) {
              const fetchedWallets = (
                await fetch(`${nodeURL}/assets/${poolAssetAddress}/distribution/${blockHeight}/limit/${limit}?after=${paginationId}`)
                .then(fetchSuccessHandler)
              );
              wallets.push(fetchedWallets.items);
              paginationId = fetchedWallets.lastItem;
              pagination = fetchedWallets.hasNext;
            }

            if(!pagination) {
              let walletsOfPoolAsset = {};
              for(let i = 0; i < wallets.length; i++) {
                walletsOfPoolAsset = {...walletsOfPoolAsset, ...wallets[i]}
              }
              wallets = [];
              return {[poolAssetName]: walletsOfPoolAsset};
            } else if(pagination) {
              return await fetchWalletsOfEachAsset(poolAssetName, poolAssetAddress, limit);
            }
            
          } catch(error) {
            dispatch({type: 'ERROR'});
          }
        }
        
        const allWallets = await Promise.all([
          ...Object.keys(poolAssets).map(poolAssetName => fetchWalletsOfEachAsset(poolAssetName, poolAssets[poolAssetName].address, 999))
        ]);

        for(let i = 0; i < allWallets.length; i++) {
          poolAttendances = {...poolAttendances, ...allWallets[i]}
        }

        //structure the object, structure decimals, calculate unique wallets, sort wallets by their balances
        function sorterByBalances(firstWallet, secondWallet) {
          const firstWalletBalance = firstWallet[Object.keys(firstWallet)[0]];
          const secondWalletBalance = secondWallet[Object.keys(secondWallet)[0]];
          return secondWalletBalance - firstWalletBalance;
        }
        const uniqueWallets = [];
        let poolAttendancesWithDecimals = {};
          Object.keys(poolAttendances).forEach(poolAttendancePair => {
            poolAttendancesWithDecimals[poolAttendancePair] = [];
            Object.keys(poolAttendances[poolAttendancePair]).forEach(walletAddress => {
              if(!uniqueWallets.includes(walletAddress)) {
                uniqueWallets.push(walletAddress);
              }
              const amount = poolAttendances[poolAttendancePair][walletAddress] / 10**poolAssets[poolAttendancePair].decimals;
              poolAttendancesWithDecimals[poolAttendancePair].push({[walletAddress]: amount});
            });
            poolAttendancesWithDecimals[poolAttendancePair].sort(sorterByBalances);
          });
        //add nonStaking uniqueWallets at the end ->
        poolAttendancesWithDecimals.uniqueWallets = uniqueWallets;

        return poolAttendancesWithDecimals;

      } catch(error) {
        dispatch({type: 'ERROR'});
      }
    }
    const liquidityProviderWalletFetches = fetchLiquidityProviderWallets();

    //

    async function fetchStakingWallets() {
      try {
        const response = await fetch(`${nodeURL}/addresses/data/3P73HDkPqG15nLXevjCbmXtazHYTZbpPoPw`);
        if(!response.ok) throw new Error('Unknown but certainly caught error!');
        const data = await response.json();
        const stakers = data.map(obj => {
          return obj.key.slice(36, 71);
        });
        return stakers;
      } catch(error) {
        dispatch({type: 'ERROR'});
      }
    }
    const stakingWalletsFetches = fetchStakingWallets();

    function calculateUniqueWallets(nonStakingWallets, stakingWallets) {
      let wallets = [...nonStakingWallets, ...stakingWallets];
      let uniqueWallets = [];
      wallets.forEach(wallet => {
        if(!uniqueWallets.includes(wallet)) {
          uniqueWallets.push(wallet);
        }
      });
      return uniqueWallets.length - 1;
    }

    //COMBINING DATA
    Promise.all([poolDataFetches, poolPairPriceFetches, fetchedPoolAssetBalance, liquidityProviderWalletFetches, stakingWalletsFetches])
      .then(([poolData, poolPairPrices, poolAssetBalances, liquidityProviderWallets, stakingWallets]) => {

        //calculate unique wallets
        liquidityProviderWallets.uniqueWallets = calculateUniqueWallets(liquidityProviderWallets.uniqueWallets, stakingWallets);

        //merge pool data and pool pair prices
        const mergedPoolDataAndPairPrices = [];
        poolData.forEach((eachPoolData, idx) => {
          mergedPoolDataAndPairPrices.push({...eachPoolData, ...poolPairPrices[idx], ...poolAssetBalances[idx]});
        });
        
        //price calculator starts
        const pricesInTermsOfUSDN = usdnPriceCalculator(mergedPoolDataAndPairPrices)
        const pricesInTermsOfWAVES = wavesPriceCalculator(mergedPoolDataAndPairPrices, pricesInTermsOfUSDN);

        //set state and say goodbye .......
        dispatch({
          type: 'DONE',
          payload: {
            poolData: mergedPoolDataAndPairPrices,
            poolProviderWallets: liquidityProviderWallets,
            pricesInUSDN: pricesInTermsOfUSDN,
            pricesInWAVES: pricesInTermsOfWAVES,
          }
        });
      })
      .catch(error => {
        dispatch({type: 'ERROR'});
      });

  }, []);

  return state;
}


export { usePoolDataFetch };