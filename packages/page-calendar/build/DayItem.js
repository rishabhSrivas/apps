// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@axia-js/react-components';
import { formatNumber, isString } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { dateCalendarFormat } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const FORMAT_OPTIONS = {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric'
};

function assertUnreachable(type) {
  throw new Error(`We should not get here, unhandled ${type}`);
}

function exportCalendar(date, description) {
  const startDate = dateCalendarFormat(date); // For now just add 1 hour for each event

  const endDate = dateCalendarFormat(new Date(new Date(date).setHours(new Date(date).getHours() + 1)));
  const calData = 'BEGIN:VCALENDAR\n' + 'CALSCALE:GREGORIAN\n' + 'METHOD:PUBLISH\n' + 'PRODID:-//Test Cal//EN\n' + 'VERSION:2.0\n' + 'BEGIN:VEVENT\n' + 'UID:test-1\n' + 'DTSTART;VALUE=DATE:' + startDate + '\n' + 'DTEND;VALUE=DATE:' + endDate + '\n' + 'SUMMARY:' + description + '\n' + 'DESCRIPTION:' + description + '\n' + 'END:VEVENT\n' + 'END:VCALENDAR';
  const fileNameIcs = encodeURI(description) + '.ics';
  const data = new File([calData], fileNameIcs, {
    type: 'text/plain'
  });
  const anchor = window.document.createElement('a');
  anchor.href = window.URL.createObjectURL(data);
  anchor.download = fileNameIcs;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(anchor.href);
}

function createLink(to, desc) {
  return /*#__PURE__*/_jsx("div", {
    className: "itemLink",
    children: /*#__PURE__*/_jsx("a", {
      href: `#/${to}`,
      children: desc
    })
  });
}

function DayItem({
  className,
  item: {
    blockNumber,
    date,
    info,
    type
  },
  showAllEvents
}) {
  const {
    t
  } = useTranslation();
  const [description, setDescription] = useState('');

  const _exportCal = useCallback(() => exportCalendar(date, description), [description, date]);

  const desc = useMemo(() => {
    const id = info && (isString(info) ? info : formatNumber(info));
    const typeLink = ['councilElection'].includes(type) ? createLink('council', t('via Council')) : ['councilMotion'].includes(type) ? createLink('council/motions', t('via Council/Motions')) : ['democracyDispatch', 'scheduler'].includes(type) ? createLink('democracy/dispatch', t('via Democracy/Dispatch')) : ['democracyLaunch', 'referendumDispatch', 'referendumVote'].includes(type) ? createLink('/democracy', t('via Democracy')) : ['societyChallenge', 'societyRotate'].includes(type) ? createLink('society', t('via Society')) : ['stakingEpoch', 'stakingEra'].includes(type) ? createLink('staking', t('via Staking')) : ['stakingSlash'].includes(type) ? createLink('staking/slashes', t('via Staking/Slashed')) : ['treasurySpend'].includes(type) ? createLink('treasury', t('via Treasury')) : ['parachainLease'].includes(type) ? createLink('parachains', t('via Parachains')) : ['parachainAuction'].includes(type) ? createLink('parachains/auction', t('via Parachains/Auction')) : undefined;
    let s = '';

    switch (type) {
      case 'councilElection':
        s = t('Election of new council candidates');
        break;

      case 'councilMotion':
        s = t('Voting ends on council motion {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'democracyDispatch':
        s = t('Enactment of the result of referendum {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'democracyLaunch':
        s = t('Start of the next referendum voting period');
        break;

      case 'parachainAuction':
        s = t('End of the current parachain auction {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'parachainLease':
        s = t('Start of the next parachain lease period {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'referendumDispatch':
        s = t('Potential dispatch of referendum {{id}} (if passed)', {
          replace: {
            id
          }
        });
        break;

      case 'referendumVote':
        s = t('Voting ends for referendum {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'scheduler':
        s = id ? t('Execute named scheduled task {{id}}', {
          replace: {
            id
          }
        }) : t('Execute anonymous scheduled task');
        break;

      case 'stakingEpoch':
        s = t('Start of a new staking session {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'stakingEra':
        s = t('Start of a new staking era {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'stakingSlash':
        s = t('Application of slashes from era {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'treasurySpend':
        s = t('Start of next spending period');
        break;

      case 'societyChallenge':
        s = t('Start of next membership challenge period');
        break;

      case 'societyRotate':
        s = t('Acceptance of new members and bids');
        break;

      default:
        return assertUnreachable(type);
    }

    setDescription(s);
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        className: "itemDesc",
        children: s
      }), typeLink]
    });
  }, [info, t, type]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [showAllEvents && /*#__PURE__*/_jsx("div", {
      className: "itemDate",
      children: date.toLocaleString(undefined, FORMAT_OPTIONS)
    }), /*#__PURE__*/_jsx("div", {
      className: "itemTime",
      children: date.toLocaleTimeString().split(':').slice(0, 2).join(':')
    }), /*#__PURE__*/_jsxs("div", {
      className: "itemBlock",
      children: ["#", formatNumber(blockNumber)]
    }), desc, date && /*#__PURE__*/_jsx(Button, {
      className: showAllEvents ? 'exportCal exportCal-allEvents' : 'exportCal',
      icon: "calendar-plus",
      onClick: _exportCal
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(DayItem).withConfig({
  displayName: "DayItem",
  componentId: "sc-10bn5ab-0"
})(["align-items:flex-start;display:flex;justify-content:flex-start;margin:0.5rem 0.75rem;> div+div{margin-left:0.5rem;}> div.itemTime+div.itemBlock{margin-left:0.25rem;}.exportCal{padding:0;position:absolute;right:1.5rem;.ui--Icon{width:0.7rem;height:0.7rem;}}.exportCal-allEvents{right:3.5rem;}.itemBlock{background:#aaa;color:#eee;font-size:0.85rem;align-self:center;padding:0.075rem 0.375rem;border-radius:0.25rem;}.itemDate{padding:0 0.375rem;border-radius:0.25rem;width:17rem;}.itemTime{background:#999;color:#eee;padding:0 0.375rem;border-radius:0.25rem;}"]));