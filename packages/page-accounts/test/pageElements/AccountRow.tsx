// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { within } from '@testing-library/react';

import { Row } from '@axia-js/test-support/pagesElements/Row';

export class AccountRow extends Row {
  async assertParentAccountName (expectedParentAccount: string): Promise<void> {
    const parentAccount = await within(this.primaryRow).findByTestId('parent');

    expect(parentAccount).toHaveTextContent(expectedParentAccount);
  }
}
