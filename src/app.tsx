import { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './routes';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log('重试');
      }}
    >
      <Suspense fallback={<div>loading...</div>}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'rgb(70, 178, 133)',
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Router />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ConfigProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
