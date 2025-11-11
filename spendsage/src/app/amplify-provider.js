'use client'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'

export default function AmplifyProvider({ children }) {
    Amplify.configure(outputs)
    return children
}