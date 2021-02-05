export const nodeURL = 'https://nodes.wavesnodes.com';

export const poolAssets = {
  ['SWOP - USDN']: {address: 'ESg4EvZaY74xe3p2dxHeXpV3RNeJd7fda4aN9RtL4bzn', decimals: 7, name: 'sSWOP_USD-N'},
  ['WAVES - USDN']: {address: 'Btw3G1j4wQgdp49PTxaFkNvn75dQtqGDM7ejQppHnWC1', decimals: 7, name: 'sWAVES_USD-N'},
  ['BTC - USDN']: {address: '58RNQJqLQ3tYYpkjuJujWzLzMX3nzpGn6bTC8LfLtgAM', decimals: 7, name: 'sWBTC_USD-N'},
  ['WAVES - BTC']: {address: '2DiiWi3RLuTYBj81iwACCSayD9d1aY2ucfoJUBDHiqH8', decimals: 8, name: 'sWAVES_WBTC'},
  ['USDT - USDN']: {address: 'BNQ8bxyiWvfHzHAtNyfc6E7v3sSHXKq8yuit6Fnz1A3Q', decimals: 6, name: 'sUSDT_USD-N'},
  ['NSBT - USDN']: {address: 'HWFcdC9wjPJY1udkR2UsfXzyPptzBb9m6df8qUW6LNLo', decimals: 6, name: 'sNSBT_USD-N'},
  ['WCT - USDN']: {address: 'AAmQ1M3pG9fP882RJdfeaoLbRtzBuwPmsximGhPXVQXN', decimals: 4, name: 'sWavesCo_USD-N'},
  ['WEST - USDN']: {address: '8g1Ki9cvjjhLUTyNwd4MaZ4fNfNTVc92Cb6f8My4qb1A', decimals: 7, name: 'sWEST_USD-N'},
  ['WAVES - EURN']: {address: 'Bz9HaLundrPQU1ibVkQt82rYnfQHXKwp6Ts9EXRLyyPk', decimals: 7, name: 'sWAVES_EURN'},
  ['USDLP - USDN']: {address: '9Pm2c97VzGSK6p8XGMCFABs575K9Cb35GdKtzwVA59m9', decimals: 6, name: 'sUSDLP_USD-N'}
};

export const pools = {
  ['SWOP - USDN']: {
    poolAddress: '3P27S9V36kw2McjWRZ37AxTx8iwkd7HXw6W', 
    firstOfPair: 'SWOP', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: 'Ehie5xYpeN8op1Cctc6aGUrqx8jq3jtf1DSjXDbfm7aT', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 8, 
    decimalsOfSecondPair: 6
  },
  ['WAVES - USDN']: {
    poolAddress: '3PHaNgomBkrvEL2QnuJarQVJa71wjw9qiqG', 
    firstOfPair: 'WAVES', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: 'WAVES', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 8, 
    decimalsOfSecondPair: 6
  },
  ['BTC - USDN']: {
    poolAddress: '3PACj2DLTw3uUhsUmT98zHU5M4hPufbHKav', 
    firstOfPair: 'BTC', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 8, 
    decimalsOfSecondPair: 6
  },
  ['WAVES - BTC']: {
    poolAddress: '3P8FVZgAJUAq32UEZtTw84qS4zLqEREiEiP', 
    firstOfPair: 'WAVES', 
    secondOfPair: 'BTC', 
    firstOfPairAddress: 'WAVES', 
    secondOfPairAddress: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS', 
    decimalsOfFirstPair: 8, 
    decimalsOfSecondPair: 8
  },
  ['USDT - USDN']: {
    poolAddress: '3PPH7x7iqobW5ziyiRCic19rQqKr6nPYaK1', 
    firstOfPair: 'USDT', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: '34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 6, 
    decimalsOfSecondPair: 6
  },
  ['NSBT - USDN']: {
    poolAddress: '3P2V63Xd6BviDkeMzxhUw2SJyojByRz8a8m', 
    firstOfPair: 'NSBT', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: '6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 6, 
    decimalsOfSecondPair: 6
  },
  ['WCT - USDN']: {
    poolAddress: '3PMDFxmG9uXAbuQgiNogZCBQASvCHt1Mdar', 
    firstOfPair: 'WCT', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: 'DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 2, 
    decimalsOfSecondPair: 6
  },
  ['WEST - USDN']: {
    poolAddress: '3P6DLdJTP2EySq9MFdJu6beUevrQd2sVVBh', 
    firstOfPair: 'WEST', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: '4LHHvYGNKJUg5hj65aGD5vgScvCBmLpdRFtjokvCjSL8', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 8, 
    decimalsOfSecondPair: 6
  },
  ['WAVES - EURN']: {
    poolAddress: '3PK7Xe5BiedRyxHLuMQx5ey9riUQqvUths2', 
    firstOfPair: 'WAVES', 
    secondOfPair: 'EURN', 
    firstOfPairAddress: 'WAVES', 
    secondOfPairAddress: 'DUk2YTxhRoAqMJLus4G2b3fR8hMHVh6eiyFx5r29VR6t', 
    decimalsOfFirstPair: 8, 
    decimalsOfSecondPair: 6
  },
  ['USDLP - USDN']: {
    poolAddress: '3PDWi8hjQJjXhyTpeaiEYfFKWBd1iC4udfF', 
    firstOfPair: 'USDLP', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: '9AT2kEi8C4AYxV1qKxtQTVpD5i54jCPvaNNRP6VzRtYZ', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 6, 
    decimalsOfSecondPair: 6
  }
}