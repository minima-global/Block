import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { txPow } from "../../__minima__";
import useScroll from "../../hooks/useScroll";
import TitleBar from '../../components/TitleBar';
import BlockInfo from "../../components/BlockInfo";

const TransactionByBlock = () => {
  useScroll();
  const { id } = useParams();
  const [active, setActive] = useState('DETAILS');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    txPow(Number(id)).then((response) => {
      setData(response);
    })
  }, [id]);

  return (
    <div className="h-full flex flex-col">
      <TitleBar id={id} />
      <BlockInfo data={data} active={active} setActive={setActive} />
    </div>
  );
};

export default TransactionByBlock;
