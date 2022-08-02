const router = require("express").Router();
const { createUser } = require("~controller/user/createUser");
const { getUser } = require("~controller/user/getUser");
const { vote } = require("~controller/user/vote");
const { getCandidates } = require("~controller/user/getCandidates");
const { createRequestHandler } = require("~common/createRequestHandler");

router.post(
  "/",
  createRequestHandler((req) => {
    return createUser({ ...req.body });
  })
);

router.get(
  "/:userId",
  createRequestHandler((req) => {
    return getUser({ userId: req.params.userId });
  })
);

router.post(
  "/vote",
  createRequestHandler((req) => {
    return vote({ ...req.body });
  })
);
router.post(
  "/candidateList",
  createRequestHandler((req) => {
    return getCandidates({ ...req.body });
  })
);
module.exports = router;
