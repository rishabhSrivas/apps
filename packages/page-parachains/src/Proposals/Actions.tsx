// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { Button } from '@axia-js/react-components';
import { useAccounts, useToggle } from '@axia-js/react-hooks';

import { useTranslation } from '../translate';
import Propose from './Propose';

interface Props {
  className?: string;
}

function Actions (): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { hasAccounts } = useAccounts();
  const [showPropose, togglePropose] = useToggle();

  return (
    <>
      <Button.Group>
        <Button
          icon='plus'
          isDisabled={!hasAccounts}
          label={t<string>('Propose')}
          onClick={togglePropose}
        />
      </Button.Group>
      {showPropose && (
        <Propose onClose={togglePropose} />
      )}
    </>
  );
}

export default React.memo(Actions);
