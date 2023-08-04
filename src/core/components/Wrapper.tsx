import { ReactElement, useMemo } from 'react';

import { QueryCache, QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';

import { queryClientConfig } from '@config/reactQuery';
import { ErrorRoutesPaths } from '@pages/shared/Errors/errors.constants';

const QueryClientContext = function ({
  config = {},
  children
}: {
  config?: QueryClientConfig;
  children: ReactElement;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useMemo(() => {
    const handleError = function ({
      httpStatus,
      message,
      code
    }: {
      httpStatus?: string;
      message?: string;
      code?: string;
    }) {
      if (httpStatus) {
        navigate(ErrorRoutesPaths.error.HttpError, { state: { message, code } });
      } else if (!httpStatus) {
        navigate(ErrorRoutesPaths.error.ErrConnection, {
          state: { pathname: location.pathname, message, code }
        });
      }
    };

    return new QueryClient({
      ...queryClientConfig,
      ...config,
      queryCache: new QueryCache({
        onError: (error) => {
          handleError(error as { httpStatus?: string });
        }
      })
    });
  }, []);

  return queryClient ? <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> : null;
};

export const Wrapper = function ({ children, config }: { config?: QueryClientConfig; children: ReactElement }) {
  return (
    <HashRouter>
      <QueryClientContext config={config}>{children}</QueryClientContext>
    </HashRouter>
  );
};
