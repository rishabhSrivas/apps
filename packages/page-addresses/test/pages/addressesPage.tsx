// Copyright 2017-2021 @axia-js/page-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { aContact } from '@axia-js/test-support/creation/contact';
import { Page } from '@axia-js/test-support/pages/Page';
import { Row } from '@axia-js/test-support/pagesElements';
import { AccountOverrides as ContactOverrides } from '@axia-js/test-support/types';
import { mockAccountHooks } from '@axia-js/test-support/utils/accountDefaults';

import AddressOverview from '../../src/Contacts/index';

jest.mock('@axia-js/react-hooks/useAddresses', () => ({
  useAddresses: () => ({
    allAddresses: mockAccountHooks.useAccounts.allAccounts,
    hasAddresses: mockAccountHooks.useAccounts.hasAccounts,
    isAddress: true
  })
}));

export class AddressesPage extends Page {
  constructor () {
    super(<AddressOverview />, 'Address-');
  }

  async getAddressesRows (): Promise<Row[]> {
    const addressesTable = await this.getTable();

    return addressesTable.getRows();
  }

  renderDefaultContacts (contactsNumber: number): void {
    const contacts = Array.from({ length: contactsNumber },
      (_, index) => [this.defaultAddresses[index], aContact()] as [string, ContactOverrides]);

    this.render(contacts);
  }

  renderContactsWithDefaultAddresses (...overrides: ContactOverrides[]): void {
    const contacts = overrides.map((contactProperties, index) =>
      [this.defaultAddresses[index], contactProperties] as [string, ContactOverrides]);

    this.render(contacts);
  }

  renderContactsForAddresses (...addresses: string[]): void {
    const contacts = addresses.map((address) => [address, aContact()] as [string, ContactOverrides]);

    this.render(contacts);
  }

  renderContacts (contacts: [string, ContactOverrides][]): void {
    this.render(contacts);
  }
}
