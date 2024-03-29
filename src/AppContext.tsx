import * as React from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { block, getManyTxPow, txPow, txPowByAddress, txPowById } from './__minima__';
import format from 'date-fns/format';
import log from './utilities/log';

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [moreIsLoading, setMoreIsLoading] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);

      (window as any).MDS.init(async (msg: any) => {
        if (msg.event === 'inited') {
          // get current block
          block().then((response: any) => {
            log(JSON.stringify(response));
            setCurrentBlock(Number(response));

            // grab first twenty transaction pow's
            getManyTxPow(Number(response)).then((response) => {
              setTransactions(response);
              setInitialLoading(false);
            });
          });

          setLoaded(true);
        }

        if (msg.event === 'NEWBLOCK') {
          setCurrentBlock(Number(msg.data.txpow.header.block));
          txPow(Number(msg.data.txpow.header.block)).then((response) => {
            setTransactions((prevState: any) => [response, ...prevState]);
          });
        }
      });
    }
  }, [loaded]);

  const { data, groups, groupCounts } = useMemo(() => {
    const lib: any = {};

    if (query !== '' && searchResults === false) {
      return {
        data: [],
        groups: [],
        groupCounts: [],
      };
    }
    if (query !== '' && searchResults && Array.isArray(searchResults)) {
      let txns: any[] = [];
      searchResults.forEach((transaction: any) => {
        const date = new Date(Number(transaction.header.timemilli));
        const day = format(date, 'dd');
        const month = format(date, 'MMM');
        const year = format(date, 'yyyy');

        const str = `${day} ${month} ${year}`;

        if (!lib[str]) {
          lib[str] = 1;
        } else {
          lib[str] += 1;
        }

        txns.push(transaction);
      });

      return {
        data: txns,
        groups: Object.keys(lib),
        groupCounts: Object.values(lib),
      };
    }

    if (query !== '' && searchResults) {
      const date = new Date(Number(searchResults.header.timemilli));

      return {
        data: [searchResults],
        groups: [format(date, 'dd MMM yyyy')],
        groupCounts: [1],
      };
    }

    transactions.forEach((transaction: any) => {
      const date = new Date(Number(transaction.header.timemilli));
      const day = format(date, 'dd');
      const month = format(date, 'MMM');
      const year = format(date, 'yyyy');

      const str = `${day} ${month} ${year}`;

      if (!lib[str]) {
        lib[str] = 1;
      } else {
        lib[str] += 1;
      }
    });

    return {
      data: transactions,
      groups: Object.keys(lib),
      groupCounts: Object.values(lib),
    };
  }, [transactions, query, searchResults]);

  const loadMore = () => {
    if (transactions[transactions.length - 1].header.block !== '1') {
      setMoreIsLoading(true);
      getManyTxPow(transactions[transactions.length - 1].header.block)
        .then((response) => {
          setTransactions((prevState: any) => [...prevState, ...response]);
        })
        .finally(() => {
          setMoreIsLoading(false);
        });
    }
  };

  const handleQuery = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === '') {
      setSearchResults(null);
    }
    setQuery(evt.target.value);
  };

  const search = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (query.includes('0x') || query.includes('Mx')) {
      txPowById(query)
        .then((response) => {
          setSearchResults(response);
        })
        .catch(() => {
          txPowByAddress(query)
            .then((response: any) => {
              // search by address is returned as an array so only
              // set search results if the array count is higher than 0
              if (response.length > 0) {
                setSearchResults(response);
              } else {
                setSearchResults(false);
              }
            })
            .catch(() => {
              log('Throwing an error!');
              setSearchResults(false);
            });
        });
    } else {
      txPow(query)
        .then((response) => {
          setSearchResults(response);
        })
        .catch(() => {
          setSearchResults(false);
        });
    }
  };

  const value = {
    loaded,
    currentBlock,
    transactions,
    data,
    groups,
    groupCounts,
    loadMore,
    query,
    handleQuery,
    search,
    searchResults,
    initialLoading,
    moreIsLoading,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
