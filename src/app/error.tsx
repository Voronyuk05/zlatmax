'use client'
import { Metadata } from "next";

import ErrorLayout from '../components/dashboard-layout/ErrorLayout/ErrorLayout';

export const metadata: Metadata = {
    title: {
      default: 'Error',
      template: 'Error'
    },
  };

export default function Error({error}: {error: Error & {digest: string}}) {
    
    return (
        <div>
            <ErrorLayout error={error.message}/>
        </div>
    )
}