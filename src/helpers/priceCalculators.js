export function usdnPriceCalculator(poolData) {
  if(!poolData) return;
  let uncalculatedInTermsOfUSDN = [];
  const pricesInTermsOfUSDN = {}; 
  poolData.forEach(pool => {
    if(pool.firstOfPair == 'USDN') {
      pricesInTermsOfUSDN[pool.secondOfPair] = Number(pool.secondOfPairPrice.toFixed(4));
    } else if(pool.secondOfPair == 'USDN') {
      pricesInTermsOfUSDN[pool.firstOfPair] = Number(pool.firstOfPairPrice.toFixed(4));
    } else if(pool.firstOfPair != 'USDN' && pool.secondOfPair != 'USDN') {
      uncalculatedInTermsOfUSDN.push(pool.firstOfPair, pool.secondOfPair);
      return;
    }
  });

  let calculatedInTermsOfUSDN = Object.keys(pricesInTermsOfUSDN);
  uncalculatedInTermsOfUSDN = uncalculatedInTermsOfUSDN.filter(uncalculated => {
    if(calculatedInTermsOfUSDN.includes(uncalculated)) return false;
    return true;
  });

  //if there is any uncalculated pair in terms of usdn, try to derive from waves price
  if(uncalculatedInTermsOfUSDN.length > 0) {
    function deriveFromWaves() {
      const pricesInTermsOfWAVES = {}; 
      poolData.forEach(pool => {
        if(pool.firstOfPair == 'WAVES') {
          pricesInTermsOfWAVES[pool.secondOfPair] = Number(pool.secondOfPairPrice.toFixed(4));
        } else if(pool.secondOfPair == 'WAVES') {
          pricesInTermsOfWAVES[pool.firstOfPair] = Number(pool.firstOfPairPrice.toFixed(4));
        }
      });
      uncalculatedInTermsOfUSDN.forEach(uncalculated => {
        Object.keys(pricesInTermsOfWAVES).find(wavesPriced => {
          if(uncalculated === wavesPriced) {
            pricesInTermsOfUSDN[wavesPriced] = Number((pricesInTermsOfWAVES[wavesPriced] * pricesInTermsOfUSDN.WAVES).toFixed(4));
            return true;
          }
          return false;
        });
      });
    }
    deriveFromWaves();

    calculatedInTermsOfUSDN = Object.keys(pricesInTermsOfUSDN);
    uncalculatedInTermsOfUSDN = uncalculatedInTermsOfUSDN.filter(uncalculated => {
      if(calculatedInTermsOfUSDN.includes(uncalculated)) return false;
      return true;
    });
  }  
  
  pricesInTermsOfUSDN.uncalculatedInTermsOfUSDN = uncalculatedInTermsOfUSDN;

  return pricesInTermsOfUSDN;
}

//

export function wavesPriceCalculator(poolData, pricesInTermsOfUSDN) {
  if(!poolData) return;
  let uncalculatedInTermsOfWAVES = [];
  const pricesInTermsOfWAVES = {}; 
  poolData.forEach(pool => {
    if(pool.firstOfPair == 'WAVES') {
      pricesInTermsOfWAVES[pool.secondOfPair] = Number(pool.secondOfPairPrice.toFixed(4));
    } else if(pool.secondOfPair == 'WAVES') {
      pricesInTermsOfWAVES[pool.firstOfPair] = Number(pool.firstOfPairPrice.toFixed(4));
    } else if(pool.firstOfPair != 'WAVES' && pool.secondOfPair != 'WAVES') {
      uncalculatedInTermsOfWAVES.push(pool.firstOfPair, pool.secondOfPair);
      return;
    }
  });

  //try to derive uncalculated prices from usdn pair prices.
  if(uncalculatedInTermsOfWAVES.length > 0) {
    const calculatedInTermsOfUSDN = Object.keys(pricesInTermsOfUSDN);
    uncalculatedInTermsOfWAVES.forEach(uncalculated => {
      calculatedInTermsOfUSDN.find(usdnPriced => {
        if(usdnPriced == uncalculated) {
          pricesInTermsOfWAVES[usdnPriced] = Number((pricesInTermsOfUSDN[usdnPriced] * pricesInTermsOfWAVES.USDN).toFixed(4));
          return true;
        }
        return false;
      });
    });
  }

  const calculatedInTermsOfWAVES = Object.keys(pricesInTermsOfWAVES);
  uncalculatedInTermsOfWAVES = uncalculatedInTermsOfWAVES.filter(uncalculated => {
    if(calculatedInTermsOfWAVES.includes(uncalculated)) return false;
    return true;
  });

  pricesInTermsOfWAVES.uncalculatedInTermsOfWAVES = uncalculatedInTermsOfWAVES;

  return pricesInTermsOfWAVES;
}