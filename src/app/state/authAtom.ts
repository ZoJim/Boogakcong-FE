import { atom } from 'jotai';

// 인증 상태를 관리하는 Atom
export const accessTokenAtom = atom<string | null>(null);
export const refreshTokenAtom = atom<string | null>(null);
export const isAuthenticatedAtom = atom((get) => !!get(accessTokenAtom));