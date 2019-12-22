import { Component, OnInit } from '@angular/core';

import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  public user: User;

  constructor() {}

  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

}
