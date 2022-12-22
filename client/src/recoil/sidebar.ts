/**
 * This atom controls the state of the Sidebar. Elevating the state
 * to a Recoil atom allows for great flexibility in which UI components
 * can control the Sidebar, like a button in the header for example.
 */

import { atom } from 'recoil';

export enum View {
  DASHBOARD,
  VOUCHER,
}

export type SidebarState = {
  selectedItem: View;
  open: boolean;
};

const initialState: SidebarState = {
  selectedItem: View.DASHBOARD,
  open: false,
};

const sidebarAtom = atom({
  key: 'sidebarState',
  default: initialState,
});

export default sidebarAtom;
