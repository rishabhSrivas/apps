// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HeaderExtended } from '@axia-js/api-derive/types';

import React, { useRef } from 'react';

import { Table } from '@axia-js/react-components';

import BlockHeader from './BlockHeader';
import { useTranslation } from './translate';

interface Props {
  headers: HeaderExtended[];
}

function BlockHeaders ({ headers }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const headerRef = useRef([
    [t('recent blocks'), 'start', 3]
  ]);

  return (
    <Table
      empty={t<string>('No blocks available')}
      header={headerRef.current}
    >
      {headers
        .filter((header) => !!header)
        .map((header): React.ReactNode => (
          <BlockHeader
            key={header.number.toString()}
            value={header}
          />
        ))}
    </Table>
  );
}

export default React.memo(BlockHeaders);
