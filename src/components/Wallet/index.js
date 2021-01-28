import { useState } from 'react';
import { WalletPoolDetail } from './WalletPoolDetail';
import { WalletOptions } from './WalletOptions';
import { useFetchWallet } from '../../helpers/useFetchWallet';
import { loading as loadingIMG } from '../../assets/images';


function Wallet({walletAddress}) {

  const [showProvided, setShowProvided] = useState(true);

  const [balances, loading, isError] = useFetchWallet(walletAddress);

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
                {balances.map((balance) => (
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