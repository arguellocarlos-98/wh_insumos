// instruments.js
import * as Sentry from '@sentry/node';
import { environment } from './env.js';

Sentry.init({
  dsn: 'https://449832f0a4298f4507e6889ddc2a3350@o4509792690110464.ingest.us.sentry.io/4510171207630848',
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  environment: environment.prod ? 'production' : 'development'
});

export default Sentry;
