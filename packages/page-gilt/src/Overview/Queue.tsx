// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { QueueTotal } from './types';

import React from 'react';

import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';

interface Props {
  className?: string;
  value: QueueTotal;
}

function Queue ({ className, value: { balance, index, numItems } }: Props): React.ReactElement<Props> {
  return (
    <tr className={className}>
      <td className='number'>
        <h1>{formatNumber(index)}</h1>
      </td>
      <td className='number all'>
        {formatNumber(numItems)}
      </td>
      <td className='all'>
        <FormatBalance value={balance} />
      </td>
    </tr>
  );
}

export default React.memo(Queue);
