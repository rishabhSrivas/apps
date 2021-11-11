// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DropdownOption, DropdownOptions } from '../../util/types';

import React from 'react';

import { ApiPromise } from '@axia-js/api';

export default function createOptions (api: ApiPromise, sectionName: string): DropdownOptions {
  const section = api.tx[sectionName];

  if (!section || Object.keys(section).length === 0) {
    return [];
  }

  return Object
    .keys(section)
    .sort()
    .map((value): DropdownOption => {
      const method = section[value];
      const inputs = method.meta.args
        .map((arg) => arg.name.toString())
        .join(', ');

      return {
        className: 'ui--DropdownLinked-Item',
        key: `${sectionName}_${value}`,
        text: [
          <div
            className='ui--DropdownLinked-Item-call'
            key={`${sectionName}_${value}:call`}
          >
            {value}({inputs})
          </div>,
          <div
            className='ui--DropdownLinked-Item-text'
            key={`${sectionName}_${value}:text`}
          >
            {(method.meta.docs[0] || value).toString()}
          </div>
        ],
        value
      };
    });
}
