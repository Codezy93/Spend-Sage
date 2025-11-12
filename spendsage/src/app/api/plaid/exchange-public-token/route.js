import { NextResponse } from 'next/server'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const plaid = new PlaidApi(new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
}))

export async function POST(req) {
  try {
    const { public_token, userId } = await req.json()
    if (!public_token || !userId) {
      return NextResponse.json({ error: 'Missing public_token or userId' }, { status: 400 })
    }

    const { data } = await plaid.itemPublicTokenExchange({ public_token })
    const { access_token, item_id } = data

    // TODO: store {userId -> access_token, item_id} securely (DB/KMS). Do NOT send to the client.
    // e.g., write to DynamoDB keyed by userId.

    return NextResponse.json({ ok: true })
  } catch (err) {
    const status = err?.response?.status || 500
    const payload = err?.response?.data || { message: String(err) }
    return NextResponse.json({ error: payload }, { status })
  }
}
