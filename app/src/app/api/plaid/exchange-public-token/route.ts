import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid/config';

type ExchangeBody = {
    public_token?: string;
};

export async function POST(request: Request) {
    try {
        const body = (await request.json().catch(() => ({}))) as ExchangeBody;

        if (!body.public_token) {
            return NextResponse.json(
                { error: 'Missing public_token when exchanging token' },
                { status: 400 },
            );
        }

        const exchangeResponse = await plaidClient
            .itemPublicTokenExchange({ public_token: body.public_token })
            .then((res) => res.data);

        return NextResponse.json({
            access_token: exchangeResponse.access_token,
            item_id: exchangeResponse.item_id,
        });
    } catch (error) {
        console.error('Exchange public token error', error);
        return NextResponse.json(
            { error: 'Failed to exchange Plaid public token' },
            { status: 500 },
        );
    }
}
