import { useState, createContext } from 'react';
import styled, { css } from 'styled-components';
import { usePoolDataFetch } from './helpers/usePoolDataFetch';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SidePools } from './components/SidePools';
import { HomeScreen } from './components/Home';
import { Wallet } from './components/Wallet';
import { PoolSummary } from './components/PoolSummary';
import { loading as loadingIMG } from './assets/images';


export const PoolDataContext = createContext();


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(10em, 15em) minmax(32em, 1fr);
  justify-content: center;
  grid-template-areas: 
    "header header"
    "pools content"
    "footer footer";
  max-width: 52em;
  margin: 1em;
  gap: 1.25em;

  @media ${({theme}) => theme.mediaQueries.main.singleCol} {
    margin: 0.5em;
    grid-template-columns: minmax(32em, 1fr);
    grid-template-areas:
      "header"
      ${props => props.showHomeScreen ? css`"pools" "content"` : css`"content" "pools"`}
      "footer";
  }

  @media ${({theme}) => theme.mediaQueries.main.adjust} {
    margin: 0.5em 0;
    grid-template-columns: 1fr;
  }

  @media(min-width: 52em) {
    margin: 1em auto;
  }
`;


function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(true);

  const [pool, setPool] = useState(undefined);

  const [walletAddress, setWalletAddress] = useState('');

  const [showWallet, setShowWallet] = useState(false);

  const {isError, loading, poolData, poolProviderWallets, pricesInUSDN, pricesInWAVES} = usePoolDataFetch();

  return (
    <PoolDataContext.Provider value={[poolData, poolProviderWallets, pricesInUSDN, pricesInWAVES]}>
      <Wrapper showHomeScreen={showHomeScreen}>
        <Header loading={loading} showHomeScreen={setShowHomeScreen} setShowWallet={setShowWallet} showPool={setPool} walletFormProps={{changeShowWallet: setShowWallet, changeWalletAddress: setWalletAddress, showHomeScreen: setShowHomeScreen, showPool: setPool}} />

        {
          (loading) ?
            null :
            <SidePools showHomeScreen={setShowHomeScreen} showWallet={setShowWallet} pool={pool} choosePool={setPool} />
        }

        {
          (loading) ?
            (<div style={{gridColumn: '1 / -1', textAlign: 'center'}}><img src={loadingIMG} alt="loading" width="66"  height="66" /></div>) :
            (isError) ?
              (<p>sorry! there is unexpected error and most likely we're on it!</p>) :

              (showHomeScreen) ?
                (<HomeScreen />) :

                (
                  (showWallet) ?
                    (<Wallet walletAddress={walletAddress} />) :

                    (
                      poolData && (pool || Object.is(pool, 0)) ? 
                        <PoolSummary pool={pool} /> : 
                        null
                    )
                )
        }

        <Footer />
      </Wrapper>
    </PoolDataContext.Provider>
  );
}


export default App;
