const router = require("express").Router();
const { createElection } = require("~controller/admin/createElection");
const { addCandidate } = require("~controller/admin/addCandidate");
const { getCandidate } = require("~controller/admin/getCandidate");
const { getAllCandidates } = require("~controller/admin/getAllCandidates");
const { createRequestHandler } = require("~common/createRequestHandler");

router.post(
  "/election",
  createRequestHandler((req) => {
    return createElection({ ...req.body });
  })
);

router.post(
  "/candidate/",
  createRequestHandler((req) => {
    return addCandidate({ ...req.body });
  })
);

router.post(
  "/candidate/:candidateId",
  createRequestHandler((req) => {
    return getCandidate({ ...req.body, candidateId: req.params.candidateId });
  })
);

router.get(
  "/election/:electionId",
  createRequestHandler((req) => {
    return getAllCandidates({ electionId: req.params.electionId });
  })
);

module.exports = router;
