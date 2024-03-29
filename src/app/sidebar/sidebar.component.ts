import { Component, OnInit } from '@angular/core';

declare const $: any;

interface SubMenuInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    submenu?: SubMenuInfo[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-note', class: '' },
    { path: '/doctor', title: 'Doctor List',  icon:'pe-7s-user', class: '' },
    { path: '/departments', title: 'Departments List',  icon:'pe-7s-note2', class: '' },
    { path: '/customer', title: 'Customer',  icon:'pe-7s-user', class: '' },
    { path: '/report', title: 'Report',  icon:'pe-7s-news-paper', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
