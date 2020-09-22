import Window from 'window-or-global';
import { AppState } from './types';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    Window.console.warn(
      'application state cannot cache to localStorage (it may not exist yet)'
    );
  }
};
