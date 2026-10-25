import { supabase } from "./supabase";

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export function onAuthStateChange(callback: any) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}