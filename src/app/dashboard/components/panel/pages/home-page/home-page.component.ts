import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

/*
import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../../../../../shared/services/learning-object/general.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.general.identifier.push({
      catalog: 'Catalog 1',
      entry: 'Entry 1'
    });

    this.generalService.general.identifier.push({
      catalog: 'Catalog 2',
      entry: 'Entry 2'
    });
    console.log(this.generalService.general);
  }

}
*/
