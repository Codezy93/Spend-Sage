import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    fullname: {
      mutable: false,
      required: true
    },
    phoneNumber: {
      mutable: false,
      required: true
    },
    email: {
      mutable: false,
      required: true
    },
  },
});
