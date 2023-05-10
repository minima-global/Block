import { useEffect, useMemo, useState } from 'react';

export function useFileList(display: boolean) {
  const [path, setPath] = useState('/');
  const [list, setList] = useState<any>(null);
  const [canonical, setCanonical] = useState('/');

  useEffect(() => {
    if (display) {
      (window as any).MDS.file.list(path, function (list: any) {
        setList(list.response.list);
        setCanonical(list.response.canonical);
      });
    }
  }, [display, path]);

  /**
   * Title of the current path
   * @type {string | string}
   */
  const title = useMemo(() => {
    if (path === '/') {
      return 'Home';
    }

    return path.split('/')[path.split('/').length - 1];
  }, [path]);

  /**
   * The previous path used for navigating
   * @type {string | string}
   */
  const previousPath = useMemo(() => {
    if (canonical === '/') {
      return null;
    }

    const previous = canonical.substr(0, canonical.lastIndexOf('/'));

    if (!previous) {
      return '/';
    }

    return previous;
  }, [canonical]);

  /**
   * Reloads directory
   */
  const reloadDirectory = () => {
    (window as any).MDS.file.list(path, function (list: any) {
      setList(list.response.list);
    });
  };

  return {
    title,
    list,
    path,
    setPath,
    canonical,
    setCanonical,
    previousPath,
    reloadDirectory,
  };
}

export default useFileList;
