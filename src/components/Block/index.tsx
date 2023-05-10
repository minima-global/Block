import * as React from 'react';
import { Link } from "react-router-dom";

const Block: React.FC<any> = ({ title, value, link = null }) => {
  return (
    <div className="p-4 bg-grey-two rounded block">
      <div className="mb-1.5">{title}</div>
      {link && (
        <Link to={link}>
          <div className={`text-sm lg:text-base break break-words ${link ? 'cursor-pointer text-white underline' : 'text-grey'}`}>{value}</div>
        </Link>
      )}
      {!link && (
        <div>
          <div className={`text-sm lg:text-base break-words ${link ? 'cursor-pointer text-white underline' : 'text-grey'}`}>{value}</div>
        </div>
      )}
    </div>
  )
}

export default Block;
