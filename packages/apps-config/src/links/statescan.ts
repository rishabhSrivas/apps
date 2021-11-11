// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    Statemine: 'statemine',
    Westmint: 'westmint'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://${chain}.statescan.io/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.statescan as string,
  paths: {
    address: 'account',
    block: 'block'
  },
  url: 'https://statescan.io/'
};
