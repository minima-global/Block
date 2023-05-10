export function sql(query: string, singleResult = true) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.sql(query, function (response: any) {
      if (response.status) {
        if (response.rows && singleResult) {
          return resolve(response.rows[0]);
        } else if (response.rows) {
          return resolve(response.rows);
        }

        return resolve(response.status);
      }

      return reject();
    });
  });
}

export function block() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd('block', function(response: any) {
      if (response.status) {
        return resolve(response.response.block);
      }

      return reject();
    });
  });
}

export function txPowById(id: number | string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`txpow txpowid:${id}`, function(response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function txPow(id: number | string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`txpow block:${id}`, function(response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function txPowByAddress(address: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`txpow address:${address}`, function(response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function getManyTxPow(from: number, amount = 30) {
  const promises = [];

  for (let i = 0; i < amount; i++) {
    promises.push(txPow(from - i));
  }

  return Promise.all(promises);
}

const exports = {};

export default exports;
