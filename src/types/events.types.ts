import { DOMAttributes } from 'react';

export type IEventProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof DOMAttributes<any>]: DOMAttributes<any>[K]
}
  