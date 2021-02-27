export const nodeURL = 'https://nodes.wavesnodes.com';

export const poolAssets = {
  ['SWOP - USDN']: {address: 'ESg4EvZaY74xe3p2dxHeXpV3RNeJd7fda4aN9RtL4bzn', decimals: 7, name: 'sSWOP_USD-N', pool: '3P27S9V36kw2McjWRZ37AxTx8iwkd7HXw6W'},
  ['WAVES - USDN']: {address: 'Btw3G1j4wQgdp49PTxaFkNvn75dQtqGDM7ejQppHnWC1', decimals: 7, name: 'sWAVES_USD-N', pool: '3PHaNgomBkrvEL2QnuJarQVJa71wjw9qiqG'},
  ['BTC - USDN']: {address: '58RNQJqLQ3tYYpkjuJujWzLzMX3nzpGn6bTC8LfLtgAM', decimals: 7, name: 'sWBTC_USD-N', pool: '3PACj2DLTw3uUhsUmT98zHU5M4hPufbHKav'},
  ['USDC - USDN']: {address: '6en9RSUmqsh5j9sYeWYUvPM2r8QXVcwscdJorgdF3uxH', decimals: 6, name: 'sUSD Coi_USD-N', pool: '3PNi1BJendWYYe2CRnqpfLoYxUZ6UTcx3LF'},
  ['USDT - USDN']: {address: 'BNQ8bxyiWvfHzHAtNyfc6E7v3sSHXKq8yuit6Fnz1A3Q', decimals: 6, name: 'sUSDT_USD-N', pool: '3PPH7x7iqobW5ziyiRCic19rQqKr6nPYaK1'},
  ['ETH - USDN']: {address: 'H8wRVSgq82j6YU1K7jXVpDXHpd5m91t3bmCzRR7uFGc7', decimals: 7, name: 'sWETH_USD-N', pool: '3PNEC4YKqZiMMytFrYRVtpW2ujvi3aGXRPm'},
  ['NSBT - USDN']: {address: 'HWFcdC9wjPJY1udkR2UsfXzyPptzBb9m6df8qUW6LNLo', decimals: 6, name: 'sNSBT_USD-N', pool: '3P2V63Xd6BviDkeMzxhUw2SJyojByRz8a8m'},
  ['USDCLP - USDN']: {address: '6SpiJVpk2zmCqZ5yjxarGaHb7CAQEWFvZsKDZktFvfMq', decimals: 6, name: 'sUSDCLP_USD-N', pool: '3PNr615DPhHpCJSq1atHYKKnoauWGHsYWBP'},
  ['USDLP - USDN']: {address: '9Pm2c97VzGSK6p8XGMCFABs575K9Cb35GdKtzwVA59m9', decimals: 6, name: 'sUSDLP_USD-N', pool: '3PDWi8hjQJjXhyTpeaiEYfFKWBd1iC4udfF'},
  ['WAVES - BTC']: {address: '2DiiWi3RLuTYBj81iwACCSayD9d1aY2ucfoJUBDHiqH8', decimals: 8, name: 'sWAVES_WBTC', pool: '3P8FVZgAJUAq32UEZtTw84qS4zLqEREiEiP'},
  ['WEST - USDN']: {address: '8g1Ki9cvjjhLUTyNwd4MaZ4fNfNTVc92Cb6f8My4qb1A', decimals: 7, name: 'sWEST_USD-N', pool: '3P6DLdJTP2EySq9MFdJu6beUevrQd2sVVBh'},
  ['WCT - USDN']: {address: 'AAmQ1M3pG9fP882RJdfeaoLbRtzBuwPmsximGhPXVQXN', decimals: 4, name: 'sWavesCo_USD-N', pool: '3PMDFxmG9uXAbuQgiNogZCBQASvCHt1Mdar'},
  ['WAVES - EURN']: {address: 'Bz9HaLundrPQU1ibVkQt82rYnfQHXKwp6Ts9EXRLyyPk', decimals: 7, name: 'sWAVES_EURN', pool: '3PK7Xe5BiedRyxHLuMQx5ey9riUQqvUths2'}
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
  ['USDC - USDN']: {
    poolAddress: '3PNi1BJendWYYe2CRnqpfLoYxUZ6UTcx3LF', 
    firstOfPair: 'USDC', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: '6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 6, 
    decimalsOfSecondPair: 6
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
  ['ETH - USDN']: {
    poolAddress: '3PNEC4YKqZiMMytFrYRVtpW2ujvi3aGXRPm', 
    firstOfPair: 'ETH', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 8, 
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
  ['USDCLP - USDN']: {
    poolAddress: '3PNr615DPhHpCJSq1atHYKKnoauWGHsYWBP', 
    firstOfPair: 'USDCLP', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: 'CrjhbC9gRezwvBZ1XwPQqRwx4BWzoyMHGFNUVdn22ep6', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 6, 
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
  ['WEST - USDN']: {
    poolAddress: '3P6DLdJTP2EySq9MFdJu6beUevrQd2sVVBh', 
    firstOfPair: 'WEST', 
    secondOfPair: 'USDN', 
    firstOfPairAddress: '4LHHvYGNKJUg5hj65aGD5vgScvCBmLpdRFtjokvCjSL8', 
    secondOfPairAddress: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p', 
    decimalsOfFirstPair: 8, 
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
  ['WAVES - EURN']: {
    poolAddress: '3PK7Xe5BiedRyxHLuMQx5ey9riUQqvUths2', 
    firstOfPair: 'WAVES', 
    secondOfPair: 'EURN', 
    firstOfPairAddress: 'WAVES', 
    secondOfPairAddress: 'DUk2YTxhRoAqMJLus4G2b3fR8hMHVh6eiyFx5r29VR6t', 
    decimalsOfFirstPair: 8, 
    decimalsOfSecondPair: 6
  }
}

export const assets = {
  'Ehie5xYpeN8op1Cctc6aGUrqx8jq3jtf1DSjXDbfm7aT': {name: 'swop', decimals: 8},
  'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p': {name: 'usdn', decimals: 6},
  '6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ': {name: 'usdc', decimals: 6},
  '34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ': {name: 'usdt', decimals: 6},
  'CrjhbC9gRezwvBZ1XwPQqRwx4BWzoyMHGFNUVdn22ep6': {name: 'usdclp', decimals: 6},
  '9AT2kEi8C4AYxV1qKxtQTVpD5i54jCPvaNNRP6VzRtYZ': {name: 'usdlp', decimals: 6},
  '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS': {name: 'btc', decimals: 8},
  '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu': {name: 'eth', decimals: 8},
  '6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g': {name: 'nsbt', decimals: 6},
  'DUk2YTxhRoAqMJLus4G2b3fR8hMHVh6eiyFx5r29VR6t': {name: 'eurn', decimals: 6},
  '4LHHvYGNKJUg5hj65aGD5vgScvCBmLpdRFtjokvCjSL8': {name: 'west', decimals: 8},
  'DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J': {name: 'wct', decimals: 2}
};