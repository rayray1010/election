const router = require("express").Router();
const { createElection } = require("~controller/admin/createElection");
const { getAllElection } = require("~controller/admin/getAllElection");
const { editElection } = require("~controller/admin/editElection");
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
router.get(
  "/election",
  createRequestHandler(() => {
    return getAllElection();
  })
);

router.get(
  "/election/:electionId",
  createRequestHandler((req) => {
    return getAllCandidates({ electionId: req.params.electionId });
  })
);

router.patch(
  "/election/:electionId",
  createRequestHandler((req) => {
    return editElection({ ...req.body, electionId: req.params.electionId });
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

module.exports = router;
