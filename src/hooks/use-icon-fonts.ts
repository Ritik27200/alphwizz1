import { useFonts } from 'expo-font';

export function useIconFonts(): [boolean, Error | null] {
  const [loaded, error] = useFonts({});
  return [loaded ?? true, error ?? null];
}
