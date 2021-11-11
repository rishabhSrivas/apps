"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createOptions;

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createOptions(api) {
  return Object.keys(api.tx).sort().filter(name => Object.keys(api.tx[name]).length).map(name => ({
    text: name,
    value: name
  }));
}