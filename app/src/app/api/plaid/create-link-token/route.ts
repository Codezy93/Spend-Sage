import { NextResponse } from 'next/server';
import {
    CountryCode,
    LinkTokenCreateResponse,
    Products,
} from 'plaid';
import { plaidClient } from '@/lib/plaid/config';

type CreateLinkTokenBody = {
    userId?: string;
};

function parseProducts(): Products[] {
    const fromEnv = process.env.NEXT_PUBLIC_PLAID_PRODUCTS;
    if (!fromEnv) {
        return ['transactions'];
    }

    return fromEnv
        .split(',')
        .map((product) => product.trim().toLowerCase())
        .filter(Boolean) as Products[];
}

export async function POST(request: Request) {
    try {
        const body = (await request.json().catch(() => ({}))) as CreateLinkTokenBody;
        if (!body.userId) {
            return NextResponse.json(
                { error: 'Missing userId when creating Plaid link token' },
                { status: 400 },
            );
        }

        const plaidResponse: LinkTokenCreateResponse = await plaidClient
            .linkTokenCreate({
                client_name: 'SpendSage',
                user: { client_user_id: body.userId },
                language: 'en',
                country_codes: [CountryCode.Us],
                products: parseProducts(),
                redirect_uri: process.env.NEXT_PUBLIC_PLAID_REDIRECT_URI || undefined,
            })
            .then((res) => res.data);

        return NextResponse.json({ link_token: plaidResponse.link_token });
    } catch (error) {
        console.error('Create link token error', error);
        return NextResponse.json(
            { error: 'Failed to create Plaid link token' },
            { status: 500 },
        );
    }
}
