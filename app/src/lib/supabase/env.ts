function requireEnv(possibleKeys: string[]) {
    for (const key of possibleKeys) {
        const value = process.env[key];
        if (value) {
            return value;
        }
    }

    throw new Error(
        `Missing required Supabase environment variable. ` +
            `Set one of: ${possibleKeys.join(", ")} in your .env.local file.`,
    );
}

export function getSupabaseConfig() {
    const supabaseUrl = requireEnv([
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_URI",
        "SUPABASE_URL",
        "SUPABASE_URI",
    ]);

    const supabaseAnonKey = requireEnv([
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "SUPABASE_ANON_KEY",
    ]);

    return {
        supabaseUrl,
        supabaseAnonKey,
    };
}
