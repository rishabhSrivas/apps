// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HeaderExtended } from '@axia-js/api-derive/types';

import React from 'react';
import { Link } from 'react-router-dom';

import { AddressMini, Digits } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util';

// TODO update HeaderExtended in api-derive
export interface HeaderExtendedWithMapping extends HeaderExtended {
  authorFromMapping?: string;
}
interface Props {
  value: HeaderExtendedWithMapping;
}

function BlockHeader ({ value }: Props): React.ReactElement<Props> | null {
  if (!value) {
    return null;
  }

  const hashHex = value.hash.toHex();

  return (
    <tr>
      <td className='number'>
        <h2><Link to={`/explorer/query/${hashHex}`}><Digits value={formatNumber(value.number)} /></Link></h2>
      </td>
      <td className='all hash overflow'>{hashHex}</td>
      <td className='address'>
        {value.authorFromMapping
          ? <AddressMini value={value.authorFromMapping} />
          : value.author && (
            <AddressMini value={value.author} />
          )}
      </td>
    </tr>
  );
}

export default React.memo(BlockHeader);
