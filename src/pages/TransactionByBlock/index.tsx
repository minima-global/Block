import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { txPow } from '../../__minima__';
import useScroll from '../../hooks/useScroll';
import TitleBar from '../../components/TitleBar';
import BlockInfo from '../../components/BlockInfo';

const TransactionByBlock = () => {
  useScroll();
  const { id } = useParams();
  const [active, setActive] = useState('DETAILS');
  const [data, setData] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    txPow(Number(id))
      .then((response) => {
        setData(response);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [id]);

  return (
    <div className="h-full flex flex-col">
      <TitleBar id={id} />
      {!notFound && <BlockInfo data={data} active={active} setActive={setActive} />}
      {notFound && <p className="mx-auto mt-6 text-slate-200 text-sm">TxPoW details not available. It may have been pruned.</p>}
    </div>
  );
};

export default TransactionByBlock;
