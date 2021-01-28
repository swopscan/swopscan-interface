import styled from 'styled-components';
import SidePool from './SidePool';
import { pools } from '../../data/addresses.js';


const StyledSidePools = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  @media ${({theme}) => theme.mediaQueries.main.singleCol} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11em, 1fr));
    grid-gap: 0.5em;
  }
`;


function SidePools(props) { 
  return (
    <nav style={{gridArea: 'pools'}}>
      <StyledSidePools>
        {
          Object.keys(pools).map(pool => {
            return <SidePool firstOfPair={pools[pool].firstOfPair.toLowerCase()} secondOfPair={pools[pool].secondOfPair.toLowerCase()} key={pool} id={pool} {...props} />
          })
        }
      </StyledSidePools>
    </nav>
  )
}


export { SidePools };