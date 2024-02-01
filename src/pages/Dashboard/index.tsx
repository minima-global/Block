import * as React from 'react';
import { throttle } from 'lodash';
import { GroupedVirtuoso } from 'react-virtuoso';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../AppContext';
import TitleBar from '../../components/TitleBar';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { initialLoading, moreIsLoading, loaded, data, groups, groupCounts, loadMore, query, handleQuery, search, searchResults } = useContext(appContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const el = document.getElementById('data-table');

    if (loaded && el) {
      const onScroll = () => {
        setScrollPosition(el.scrollTop);
      };

      const throttledOnScroll = throttle(onScroll, 50);

      el.addEventListener('scroll', throttledOnScroll);

      return () => {
        el.removeEventListener('scroll', throttledOnScroll);
      };
    }
  }, [loaded]);

  const backToTop = () => {
    document.getElementById('data-table')!.scroll(0, 0);
  };

  return (
    <div className="h-full flex flex-col">
      <TitleBar home />
      <div className="flex flex-col flex-grow text-white overflow-hidden">
        <div className={`bg-grey-two table-header transition ease-in-out duration-75 ${scrollPosition === 0 ? '' : 'table-header--active'}`}>
          <div className={`${scrollPosition === 0 ? 'opacity-100' : 'opacity-0'} pt-4 pb-2 px-4`}>
            <div className="relative w-full">
              <form onSubmit={search}>
                <input
                  value={query}
                  onChange={handleQuery}
                  type="text"
                  className="outline-none text-black bg-slate-100 w-full py-3 pl-4 pr-12 rounded focus:outline focus:outline-teal-200 focus:bg-white"
                  placeholder="Search by address, block or txpowid"
                />
                <button type="submit">
                  <svg className="active:scale-90 transition absolute top-3 right-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.3913 10.6957C18.3913 14.9458 14.9459 18.3913 10.6957 18.3913C6.44546 18.3913 3 14.9458 3 10.6957C3 6.44546 6.44546 3 10.6957 3C14.9459 3 18.3913 6.44546 18.3913 10.6957Z"
                      stroke="#08090B"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M21 21L17 17" stroke="#08090B" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="transition p-4 text-sm bg-grey-two font-bold text-grey pr-6">
            <div className={`grid grid-cols-12 table-content ${scrollPosition !== 0 ? 'lg:px-4' : ''}`}>
              <div className="col-span-2 lg:col-span-1">Block</div>
              <div className="col-span-6 lg:col-span-8 pl-4">Hash</div>
              <div className="col-span-2 lg:col-span-1 pl-3">Txns</div>
              <div className="col-span-2 text-right">Time</div>
            </div>
          </div>
        </div>
        <div className="flex-grow table-content">
          {initialLoading && (
            <div className="flex w-full h-full justify-center items-center">
              <div className="text-center mb-3">
                <div role="status" className="inline-block mx-auto mb-3">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                <div className="text-grey relative">Loading, please wait</div>
              </div>
            </div>
          )}
          {moreIsLoading && (
            <div className="fixed bottom-4 right-7 z-30">
              <div className="text-center">
                <div role="status" className="inline-block mx-auto mb-3">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {query !== '' && searchResults === false && (
            <div className="grid grid-cols-12 py-12 p-4 text-sm text-center">
              <div className="col-span-12 text-grey">No results</div>
            </div>
          )}
          <GroupedVirtuoso
            id="data-table"
            groupCounts={groupCounts}
            style={{ height: '100%' }}
            className={`dataTable custom-scrollbar ${query !== '' && searchResults === false ? 'hidden' : ''}`}
            groupContent={(index) => {
              return <div className="sticky-header font-bold text-grey text-sm py-2 px-3">{groups[index]}</div>;
            }}
            itemContent={(index) => {
              if (data.length === 0) {
                return;
              }

              return (
                <Link to={`/${data[index].header.block}`}>
                  <div className="grid grid-cols-12 p-4 text-sm border-b border-custom-grey active:selection">
                    <div className="col-span-2 lg:col-span-1">{data[index].header.block}</div>
                    <div className="col-span-6 lg:col-span-8 pl-4 overflow-hidden text-ellipsis pr-5">{data[index].txpowid}</div>
                    <div className="col-span-2 lg:col-span-1 pl-3">{data[index].body.txnlist.length + data[index].istransaction ? 1 : 0}</div>
                    <div className="col-span-2 text-right ">{format(new Date(Number(data[index].header.timemilli)), 'HH:mm:ss')}</div>
                  </div>
                </Link>
              );
            }}
            overscan={200}
            endReached={loadMore}
          />
        </div>
        <div className="fixed centered bottom-5 z-50">
          <div
            onClick={backToTop}
            className={`active:scale-95 cursor-pointer bg-grey py-3 px-6 rounded-full text-sm transition-transform transform ${scrollPosition > 30 ? 'scale-100' : 'scale-0'}`}
          >
            Back to top
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
