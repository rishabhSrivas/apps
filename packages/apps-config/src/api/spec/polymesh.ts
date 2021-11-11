// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@axia-js/types/types';

import schema from '@polymathnetwork/polymesh-types';

const definitions: OverrideBundleDefinition = {
  rpc: schema.rpc,
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: schema.types
    }
  ]
};

export default definitions;
