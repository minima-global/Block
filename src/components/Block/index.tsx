import * as React from 'react';
import { Link } from 'react-router-dom';
import Clipboard from 'react-clipboard.js';
import copySvg from '../../assets/copy.svg';
import checkCircleSvg from '../../assets/check_circle.svg';
import { useEffect, useState } from 'react';

const Block: React.FC<any> = ({ title, value, link = null, copy }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  return (
    <div className="p-4 bg-grey-two rounded block relative">
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
      {copy && (
        <div>
          {!copied && (
            <div className="absolute top-3 right-3 md:top-4 md:right-4">
              <Clipboard data-clipboard-text={value} onClick={() => setCopied(true)}>
                <div className="flex items-center">
                  <img className="cursor-pointer" src={copySvg} alt="Copy" />
                </div>
              </Clipboard>
            </div>
          )}
          {copied && (
            <div className="absolute top-3 right-3 md:top-4 md:right-4">
              <div className="flex items-center">
                <div className="text-sm text-green flex items-center gap-2">
                  Copied to clipboard <img src={checkCircleSvg} alt="Copied" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Block;
