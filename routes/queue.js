const express = require("express");
const { mm1, mmc, mgc } = require("../utils/queueModels");
const router = express.Router();

router.get("/mm1", (req, res) => {
  const { lambda, mu } = req.query;
  res.json(mm1(parseFloat(lambda), parseFloat(mu)));
});

router.get("/mmc", (req, res) => {
  const { lambda, mu, c } = req.query;
  res.json(mmc(parseFloat(lambda), parseFloat(mu), parseInt(c)));
});

router.get("/mgc", (req, res) => {
  const { lambda, mu, c, sigma } = req.query;
  res.json(
    mgc(parseFloat(lambda), parseFloat(mu), parseInt(c), parseFloat(sigma))
  );
});

module.exports = router;
