import { NextResponse } from 'next/server'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

function getPlaidClient() {
  const env = (process.env.PLAID_ENV || 'sandbox')
  const config = new Configuration({
    basePath: PlaidEnvironments[env],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
  })
  return new PlaidApi(config)
}

export async function POST(req) {
  try {
    const { email, name, userId, phoneNumber } = await req.json()
    const client_user_id = String(userId || email)
    if (!client_user_id || !email || !name || !phoneNumber) {
      return NextResponse.json({ error: 'Missing name/email/phone/userId' }, { status: 400 })
    }

    const plaid = getPlaidClient()
    const { data } = await plaid.linkTokenCreate({
      user: { client_user_id, legal_name: name, email_address: email, phone_number: phoneNumber },
      client_name: 'Spend Sage',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
      ...(process.env.PLAID_REDIRECT_URI ? { redirect_uri: process.env.PLAID_REDIRECT_URI } : {}),
      ...(process.env.PLAID_WEBHOOK ? { webhook: process.env.PLAID_WEBHOOK } : {}),
    })

    return NextResponse.json(data) // { link_token, expiration, ... }
  } catch (err) {
    const status = err?.response?.status || 500
    const payload = err?.response?.data || { message: String(err) }
    return NextResponse.json({ error: payload }, { status })
  }
}
