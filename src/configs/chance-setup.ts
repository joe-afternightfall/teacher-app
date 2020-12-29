// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chance = require('chance');

const seed = new Date().getTime();
const chance = new Chance(seed);

console.log(`initial chance seed: ${seed}`);

(global as any).chance = chance;
