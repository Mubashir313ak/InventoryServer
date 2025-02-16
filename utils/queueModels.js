const math = require("mathjs");

// M/M/1 Queue
function mm1(lambda, mu) {
  if (lambda >= mu) return { error: "System is unstable (λ ≥ μ)" };

  const rho = lambda / mu;
  const L = rho / (1 - rho);
  const Lq = rho ** 2 / (1 - rho);
  const W = 1 / (mu - lambda);
  const Wq = rho / (mu - lambda);

  return { L, Lq, W, Wq, rho };
}

// M/M/c Queue
function mmc(lambda, mu, c) {
  if (lambda >= c * mu) return { error: "System is unstable (λ ≥ cμ)" };

  const rho = lambda / (c * mu);
  const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

  let sum = 0;
  for (let n = 0; n < c; n++) {
    sum += (lambda / mu) ** n / factorial(n);
  }

  const P0 = 1 / (sum + (lambda / mu) ** c / (factorial(c) * (1 - rho)));
  const Lq = (P0 * (lambda / mu) ** c * rho) / (factorial(c) * (1 - rho) ** 2);
  const L = Lq + lambda / mu;
  const Wq = Lq / lambda;
  const W = Wq + 1 / mu;

  return { L, Lq, W, Wq, rho };
}

// M/G/c Queue
function mgc(lambda, mu, c, sigma) {
  const mmcValues = mmc(lambda, mu, c);
  if (mmcValues.error) return mmcValues;

  const Wq_mmc = mmcValues.Wq;
  const Wq = Wq_mmc + (sigma ** 2 + 1 / mu ** 2) / (2 * Wq_mmc);
  const Lq = lambda * Wq;
  const W = Wq + 1 / mu;
  const L = lambda * W;

  return { L, Lq, W, Wq, rho: mmcValues.rho };
}

module.exports = { mm1, mmc, mgc };
