import { useSyncExternalStore } from "react";

/**
 * Lightweight, zero-dependency Zustand-compatible store implementation
 * using React 19's useSyncExternalStore.
 */
export function createStore(initializer) {
  let state;
  const listeners = new Set();

  const getState = () => state;

  const setState = (updater) => {
    const nextState = typeof updater === "function" ? updater(state) : updater;
    if (nextState !== state && nextState !== undefined) {
      state = Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state));
    }
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = initializer(setState, getState);

  const useStore = (selector = (s) => s) => {
    return useSyncExternalStore(
      subscribe,
      () => selector(state),
      () => selector(state)
    );
  };

  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;

  return useStore;
}
