/**
 * This atom controls the state of the Sidebar. Elevating the state
 * to a Recoil atom allows for great flexibility in which UI components
 * can control the Sidebar, like a button in the header for example.
 */

import { atom } from 'recoil';

export enum View {
  DASHBOARD = 'dashboard',
  VOUCHER = 'new-voucher',
}

export type SidebarState = {
  selectedView: View;
  open: boolean;
};

const initialState: SidebarState = {
  selectedView: View.DASHBOARD,
  open: true,
};

const sidebarAtom = atom({
  key: 'sidebarState',
  default: initialState,
});

export default sidebarAtom;
