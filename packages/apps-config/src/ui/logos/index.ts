// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint sort-keys: ["error", "asc", { caseSensitive: false }] */

// The mapping here is done on the actual chain name (system.chain RPC) or
// the actual RPC node it is corrected to (system.name RPC)

// anything for a specific chain, most would probably fit into the node category (but allow for chain-specific)
// alphabetical
import { sanitize } from '../util';

import nodeAxccanarynet from './nodes/axccanarynet.svg';
import nodeChainx from './nodes/chainx.svg';

import nodePontem from './nodes/pontem.svg';
import nodeAxctestnet from './nodes/axctestnet.svg';

import emptyLogo from './empty.svg';

// last-resort fallback, just something empty

// Alphabetical overrides based on the actual matched chain name
// NOTE: This is as retrieved via system.chain RPC
export const chainLogos = Object.entries({

   ChainX: nodeChainx,
  'Pontem Testnet': nodePontem,
   axctestnet: nodeAxctestnet,
   axccanarynet: nodeAxccanarynet,

  }).reduce<Record<string, unknown>>((logos, [chain, logo]) => ({
  ...logos,
  [sanitize(chain)]: logo
}), {});

// Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via system.name RPC
export const nodeLogos = Object.entries({

   ChainX: nodeChainx,
   'Pontem Testnet': nodePontem,
   axctestnet: nodeAxctestnet,
   axccanarynet: nodeAxccanarynet,
   empty: emptyLogo,

}).reduce<Record<string, unknown>>((logos, [node, logo]) => ({
  ...logos,
  [sanitize(node)]: logo
}), {});

// Alphabetical overrides based on the actual specName
export const specLogos = Object.entries({
}).reduce<Record<string, unknown>>((logos, [spec, logo]) => ({
  ...logos,
  [sanitize(spec)]: logo
}), {});

// Alphabetical overrides when we pass an explicit logo name
// NOTE: Matches with what is defined as "info" in settings/endpoints.ts
// (Generally would be the 'network' key in the known ss58 as per
// https://github.com/axia-js/common/blob/master/packages/networks/src/index.ts)
export const namedLogos: Record<string, unknown> = {
      
  chainx: nodeChainx,
  pontem: nodePontem,
  axctestnet: nodeAxctestnet,
  axccanarynet: nodeAxccanarynet,


};

// extension logos
export const extensionLogos: Record<string, unknown> = {
};

// external logos, i.e. for explorers
export const externalLogos: Record<string, unknown> = {
};

// empty logos
export const emptyLogos: Record<string, unknown> = {
  empty: emptyLogo	
};

// preload all
[chainLogos, extensionLogos, externalLogos, namedLogos, nodeLogos, emptyLogos].forEach((imageSet): void => {
  Object.values(imageSet).forEach((src): void => {
    new Image().src = src as string;
  });
});
