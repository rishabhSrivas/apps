// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveSocietyCandidate } from '@axia-js/api-derive/types';
import type { Option } from '@axia-js/types';
import type { AccountId, SocietyVote } from '@axia-js/types/interfaces';
import type { VoteType } from '../types';

import React from 'react';

import { AddressSmall } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';

import Votes from '../Overview/Votes';
import BidType from './BidType';
import CandidateVoting from './CandidateVoting';

interface Props {
  allMembers: string[];
  isMember: boolean;
  ownMembers: string[];
  value: DeriveSocietyCandidate;
}

function Candidate ({ allMembers, isMember, ownMembers, value: { accountId, kind, value } }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const votes = useCall<VoteType[]>(api.query.society.votes.multi, [allMembers.map((memberId): [AccountId, string] => [accountId, memberId])], {
    transform: (voteOpts: Option<SocietyVote>[]): VoteType[] =>
      voteOpts
        .map((voteOpt, index): [string, Option<SocietyVote>] => [allMembers[index], voteOpt])
        .filter(([, voteOpt]) => voteOpt.isSome)
        .map(([accountId, voteOpt]): VoteType => [accountId, voteOpt.unwrap()])
  });

  return (
    <tr>
      <td className='address all'>
        <AddressSmall value={accountId} />
      </td>
      <BidType value={kind} />
      <td className='number'>
        <FormatBalance value={value} />
      </td>
      <Votes votes={votes} />
      <td className='button'>
        <CandidateVoting
          candidateId={accountId.toString()}
          isMember={isMember}
          ownMembers={ownMembers}
        />
      </td>
    </tr>
  );
}

export default React.memo(Candidate);
