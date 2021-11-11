// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component from '@axia-js/app-poll';
export default function create(t) {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: ['tx.poll.vote']
    },
    group: 'governance',
    icon: 'podcast',
    name: 'poll',
    text: t('nav.poll', 'Token poll', {
      ns: 'apps-routing'
    })
  };
}