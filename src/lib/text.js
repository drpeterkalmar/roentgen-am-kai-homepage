// Deutsche Aufzählung: ['A', 'B', 'C'] → „A, B und C“ (auch für Node: dexa.js wird von postbuild gelesen)
export const listDE = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} und ${a[a.length - 1]}`);
