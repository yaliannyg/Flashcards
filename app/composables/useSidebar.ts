/**
 * Shared open/close state for the mobile navigation drawer. State lives in
 * `useState` so the layout's menu button and the sidebar itself stay in sync.
 * On desktop the sidebar is always visible regardless of this value.
 */
export function useSidebar() {
  const isOpen = useState<boolean>("sidebar:open", () => false);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, open, close, toggle };
}
