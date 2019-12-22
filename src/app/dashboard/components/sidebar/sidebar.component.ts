import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ITEMS_ADMIN, MENU_ITEMS_CLIENT, MENU_ITEMS_SUPER_ADMIN } from './pages-menus';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: NbMenuItem[];

  constructor() { }

  public ngOnInit(): void {
    this.getMenu();
  }

  private getMenu(): void {
    const user: User = JSON.parse(window.localStorage.getItem('user'));

    switch (user.role) {
      case 'super-admin':
        this.menuItems = MENU_ITEMS_SUPER_ADMIN;
        break;
      case 'admin':
        this.menuItems = MENU_ITEMS_ADMIN;
        break;
      case 'client':
        this.menuItems = MENU_ITEMS_CLIENT;
        break;
    }
  }

}
