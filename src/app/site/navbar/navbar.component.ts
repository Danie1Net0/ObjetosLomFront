import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor() { }

  public ngOnInit(): void {
  }

  logout(): void {
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
        window.location.reload();
      }
    });
  }

}
