"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CurrentList = _interopRequireDefault(require("./CurrentList.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview({
  className = '',
  favorites,
  hasQueries,
  isIntentions,
  paraValidators,
  stakingOverview,
  targets,
  toggleFavorite,
  toggleLedger
}) {
  (0, _react.useEffect)(() => {
    toggleLedger && toggleLedger();
  }, [toggleLedger]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `staking--Overview ${className}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CurrentList.default, {
      favorites: favorites,
      hasQueries: hasQueries,
      isIntentions: isIntentions,
      paraValidators: paraValidators,
      stakingOverview: stakingOverview,
      targets: targets,
      toggleFavorite: toggleFavorite
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;