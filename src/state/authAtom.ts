import { atom } from 'jotai';

// 인증 상태를 관리하는 Atom
import { atomWithStorage } from 'jotai/utils';

export const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);
export const refreshTokenAtom = atomWithStorage<string | null>('refreshToken', null);
export const isAuthenticatedAtom = atom((get) => !!get(accessTokenAtom));