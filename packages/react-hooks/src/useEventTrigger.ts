// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AugmentedEvent } from '@axia-js/api/types';
import type { Vec } from '@axia-js/types';
import type { EventRecord } from '@axia-js/types/interfaces';

import { useEffect, useState } from 'react';

import { useApi } from './useApi';
import { useCall } from './useCall';
import { useIsMountedRef } from './useIsMountedRef';

type EventCheck = AugmentedEvent<'promise'> | false | undefined | null;

interface Result {
  blockHash: string;
  events: EventRecord[];
}

const EMPTY_RESULT: Result = {
  blockHash: '',
  events: []
};

const IDENTITY_FILTER = () => true;

export function useEventTrigger (_checks: EventCheck[], filter: (record: EventRecord) => boolean = IDENTITY_FILTER): Result {
  const { api } = useApi();
  const [state, setState] = useState(() => EMPTY_RESULT);
  const [checks] = useState(() => _checks);
  const mountedRef = useIsMountedRef();
  const eventRecords = useCall<Vec<EventRecord>>(api.query.system.events);

  useEffect((): void => {
    if (mountedRef.current && eventRecords) {
      const events = eventRecords.filter((r) =>
        r.event &&
        checks.some((c) => c && c.is(r.event)) &&
        filter(r)
      );

      if (events.length) {
        setState({
          blockHash: eventRecords.createdAtHash?.toHex() || '',
          events
        });
      }
    }
  }, [eventRecords, checks, filter, mountedRef]);

  return state;
}
