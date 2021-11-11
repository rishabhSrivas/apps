"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTreasuryProposalVote = isTreasuryProposalVote;

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isTreasuryProposalVote(proposal) {
  if (!proposal) {
    return false;
  }

  const {
    method,
    section
  } = proposal.registry.findMetaCall(proposal.callIndex);
  return section === 'treasury' && ['approveProposal', 'rejectProposal'].includes(method) && !!proposal.args[0];
}