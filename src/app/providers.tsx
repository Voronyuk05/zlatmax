'use client'
import { AppStore, makeStore } from '@/lib/store'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { PropsWithChildren, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { type Persistor, persistStore } from 'redux-persist';
import { Toaster } from 'react-hot-toast';


export const Providers = ({children}: PropsWithChildren) => {
    const [client] = useState(new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 0,
            }
        }
    }))

    const storeRef = useRef<AppStore>()
    const persistorRef = useRef<Persistor>({} as Persistor);
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
      persistorRef.current = persistStore(storeRef.current)
    }

    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools/>
            <ReactQueryStreamedHydration>
                <Provider store={storeRef.current}>
                    <PersistGate persistor={persistorRef.current}>
                        {children}
                        <Toaster position="top-center" reverseOrder={false}/>
                    </PersistGate>
                </Provider>
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}