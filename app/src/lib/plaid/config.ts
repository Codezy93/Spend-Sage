import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const plaidEnv =
    (process.env.NEXT_PUBLIC_PLAID_ENV ?? 'sandbox').toLowerCase();

const configuration = new Configuration({
    basePath:
        plaidEnv === 'production'
            ? PlaidEnvironments.production
            : plaidEnv === 'development'
                ? PlaidEnvironments.development
                : PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.NEXT_PUBLIC_PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.NEXT_PUBLIC_PLAID_SECRET,
        },
    },
});

export const plaidClient = new PlaidApi(configuration);

export default configuration;
