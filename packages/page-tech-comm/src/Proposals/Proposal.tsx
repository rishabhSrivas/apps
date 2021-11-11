// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@axia-js/api-derive/types';
import type { AccountId, Hash } from '@axia-js/types/interfaces';

import React from 'react';

import ProposalCell from '@axia-js/app-democracy/Overview/ProposalCell';
import { AddressMini } from '@axia-js/react-components';
import { useApi, useCall, useCollectiveInstance, useVotingStatus } from '@axia-js/react-hooks';
import { BlockToTime } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';

import Close from './Close';
import Voting from './Voting';

interface Props {
  className?: string;
  imageHash: Hash;
  isMember: boolean;
  members: string[];
  prime?: AccountId | null;
  type: 'membership' | 'technicalCommittee';
}

function Proposal ({ className = '', imageHash, members, prime, type }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const derive = useCall<DeriveCollectiveProposal>(api.derive[type].proposal, [imageHash]);
  const { hasFailed, isCloseable, isVoteable, remainingBlocks } = useVotingStatus(derive?.votes, members.length, type);
  const modLocation = useCollectiveInstance(type);

  if (!modLocation || !derive || !derive.votes) {
    return null;
  }

  const { ayes, end, index, nays, threshold } = derive.votes;

  return (
    <tr className={className}>
      <td className='number'><h1>{formatNumber(index)}</h1></td>
      <ProposalCell
        imageHash={imageHash}
        proposal={derive.proposal}
      />
      <td className='number'>
        {formatNumber(ayes.length)}/{formatNumber(threshold)}
      </td>
      <td className='number together'>
        {remainingBlocks && end && (
          <>
            <BlockToTime value={remainingBlocks} />
            #{formatNumber(end)}
          </>
        )}
      </td>
      <td className='address'>
        {ayes.map((address, index): React.ReactNode => (
          <AddressMini
            key={`${index}:${address.toHex()}`}
            value={address}
            withBalance={false}
          />
        ))}
      </td>
      <td className='address'>
        {nays.map((address, index): React.ReactNode => (
          <AddressMini
            key={`${index}:${address.toHex()}`}
            value={address}
            withBalance={false}
          />
        ))}
      </td>
      <td className='button'>
        {isVoteable && !isCloseable && (
          <Voting
            hash={imageHash}
            members={members}
            prime={prime}
            proposalId={index}
            type={type}
          />
        )}
        {isCloseable && (
          <Close
            hasFailed={hasFailed}
            hash={imageHash}
            idNumber={index}
            proposal={derive.proposal}
            type={type}
          />
        )}
      </td>
    </tr>
  );
}

export default React.memo(Proposal);
