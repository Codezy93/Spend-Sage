import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Users: a
    .model({
      id: a.id(),                     // primary key
      email: a.string().required(),   // make key PII required
      phoneNumber: a.string().required(),
      fullName: a.string().required(),
      plaidAccessToken: a.string().required(),
    })
    // Owner-only access (Cognito User Pool). Add an Admin group if you need ops access.
    .authorization((allow) => [
      allow.owner(),                  // grants CRUD to the signed-in user (owner = Cognito sub)
      // allow.groups(['Admin']),     // (optional) add a group for backoffice/admin tools
    ]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    // Default to USER POOL auth for this app (signed-in users only)
    defaultAuthorizationMode: 'userPool',
    // If you truly need public/guest access later, add it intentionally:
    // additionalAuthorizationModes: ['identityPool'],
  },
})


/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
