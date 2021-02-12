import { useState } from 'react';
import { WalletPoolDetail } from './WalletPoolDetail';
import { WalletOptions } from './WalletOptions';
import { SwopDetail } from './SwopDetail';
import { FetchWalletData } from '../../helpers/FetchWalletData';
import { loading as loadingIMG } from '../../assets/images';


function Wallet({walletAddress}) {

  const [showProvided, setShowProvided] = useState(true);

  const [balances, loading, isError] = FetchWalletData(walletAddress);

  return (
    <main style={{gridArea: "content"}}>
      {
        (loading) ?
          (<div style={{textAlign: 'center'}}><img src={loadingIMG} alt="loading" width="66"  height="66" /></div>) :
          (isError) ?
            (<p>sorry! there is unexpected error and most likely we're on it!</p>) :
            (
              <>
                <WalletOptions showProvided={showProvided} setShowProvided={setShowProvided} />              
                <SwopDetail stakedSwop={balances[0]} />              
                {balances.slice(1).map((balance) => (
                  (Object.is(balance.walletBalance, 0) && showProvided) ? 
                    null : 
                    <WalletPoolDetail key={balance.name} {...balance} walletAddress={walletAddress} />
                ))}
              </>
            )
      }
    </main>
  )
}


export { Wallet };