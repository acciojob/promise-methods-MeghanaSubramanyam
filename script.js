function myRace(promises) {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            Promise.resolve(promise).then(resolve, reject);
        }
    });
}

function myAny(promises) {
    return new Promise((resolve, reject) => {
        let rejections = 0;
        for (const promise of promises) {
            Promise.resolve(promise).then(resolve).catch(() => {
                rejections++;
                if (rejections === promises.length) {
                    reject("all promises rejected");
                }
            });
        }
    });
}

function myAll(promises) {
    return new Promise((resolve, reject) => {
        let results = new Array(promises.length);
        let completed = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                results[index] = value;
                completed++;
                if (completed === promises.length) {
                    resolve(results);
                }
            }).catch(reject);
        });
    });
}

function myAllSettled(promises) {
    return new Promise((resolve) => {
        let results = new Array(promises.length);
        let completed = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                results[index] = { status: 'fulfilled', value };
            }).catch(error => {
                results[index] = { status: 'rejected', error };
            }).finally(() => {
                completed++;
                if (completed === promises.length) {
                    resolve(results);
                }
            });
        });
    });
}

module.exports = {
  myRace,
  myAny,
  myAll,
  myAllSettled
};
