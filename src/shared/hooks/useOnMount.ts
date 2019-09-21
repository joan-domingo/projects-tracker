import { useEffect } from 'react';

type CleanupFunction = () => void;

export default function useOnMount(effect: () => CleanupFunction | void) {
  useEffect(effect, []);
}
