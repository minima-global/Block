import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { txPowById } from "../../__minima__";
import useScroll from "../../hooks/useScroll";
import TitleBar from '../../components/TitleBar';
import BlockInfo from "../../components/BlockInfo";

const TransactionById = () => {
  useScroll();
  const { id } = useParams();
  const [active, setActive] = useState('DETAILS');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    txPowById(String(id)).then((response) => {
      setData(response);
    })
  }, [id]);

  return (
    <div className="h-full flex flex-col">
      <TitleBar id={data?.header?.block} />
      <BlockInfo data={data} active={active} setActive={setActive} />
    </div>
  );
};

export default TransactionById;
