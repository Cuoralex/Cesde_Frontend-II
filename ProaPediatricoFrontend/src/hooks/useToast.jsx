import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

// 🔒 Constantes únicas (evita strings sueltos)
const ACTIONS = Object.freeze({
  ADD: "ADD_TOAST",
  UPDATE: "UPDATE_TOAST",
  DISMISS: "DISMISS_TOAST",
  REMOVE: "REMOVE_TOAST",
});

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map();

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: ACTIONS.REMOVE, toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case ACTIONS.UPDATE:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case ACTIONS.DISMISS: {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((t) => addToRemoveQueue(t.id));
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      };
    }

    case ACTIONS.REMOVE:
      return {
        ...state,
        toasts: action.toastId
          ? state.toasts.filter((t) => t.id !== action.toastId)
          : [],
      };

    default:
      return state;
  }
};

const listeners = [];
let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function toast(props) {
  const id = genId();

  const update = (newProps) =>
    dispatch({
      type: ACTIONS.UPDATE,
      toast: { ...newProps, id },
    });

  const dismiss = () =>
    dispatch({ type: ACTIONS.DISMISS, toastId: id });

  dispatch({
    type: ACTIONS.ADD,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, update, dismiss };
}

function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index !== -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId) =>
      dispatch({ type: ACTIONS.DISMISS, toastId }),
  };
}

export { useToast, toast };
