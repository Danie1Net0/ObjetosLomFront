import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { LayoutService } from '../../../shared/services/layout.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: User;
  public userMenu = [ { title: 'Site', id: 'site' }, { title: 'Sair', id: 'logout' } ];

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private nbMenuService: NbMenuService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenuTag'),
      )
      .subscribe((item: any) => {
        switch (item.item.id) {
          case 'site':
            this.goToSite();
            break;
          case 'logout':
            this.logout();
            break;
        }
      });
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  private goToSite(): void {
    this.router.navigate(['/']);
  }

  private logout(): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Quer mesmo sair?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sair',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        window.localStorage.clear();
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
