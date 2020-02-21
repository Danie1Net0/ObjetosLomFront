import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LearningObjectsService } from '../learning-objects.service';
import { GeneralService } from '../../../../../../shared/services/learning-object/general.service';
import { LifecyleService } from "../../../../../../shared/services/learning-object/lifecyle.service";

@Component({
  selector: 'app-objects-create',
  templateUrl: './objects-create.component.html',
  styleUrls: ['./objects-create.component.scss']
})
export class ObjectsCreateComponent implements OnInit {

  public message$: Subject<object> = new Subject<object>();
  public loading$: Subject<boolean> = new Subject<boolean>();
  public tabs = [
    {
      title: 'Geral',
      route: 'geral',
      responsive: true
    },
    {
      title: 'Ciclo de Vida',
      route: 'ciclo-de-vida',
      responsive: true
    },
    {
      title: 'Metadados',
      route: 'metadados',
      responsive: true
    },
    {
      title: 'Técnico',
      route: 'tecnico',
      responsive: true
    },
    {
      title: 'Educacional',
      route: 'educacional',
      responsive: true
    },
    {
      title: 'Direitos',
      route: 'direitos',
      responsive: true
    },
    {
      title: 'Relação',
      route: 'relacao',
      responsive: true
    },
    {
      title: 'Anotação',
      route: 'annotation',
      responsive: true
    },
    {
      title: 'Classificação',
      route: 'classification',
      responsive: true
    },
  ];

  constructor(
    private generalService: GeneralService,
    private lifecycleService: LifecyleService,
    private learningObjectsService: LearningObjectsService
  ) {
  }

  public ngOnInit(): void {
  }

  public save(): void {
    console.log(this.generalService.general);
    console.log(this.lifecycleService.lifecycle);
    // this.loading$.next(true);
    //
    // this.onClose();
    //
    // this.learningObjectsService.save(this.formGroup.value).subscribe(success => {
    //       this.resetForm();
    //
    //       const message = {
    //         success: true,
    //         type: 'success',
    //         content: 'Empresa cadastrada com succeso! Enviamos um e-mail para que ela possa finalizar o cadastro.'
    //       };
    //
    //       this.message$.next(message);
    //     },
    //     error => {
    //       const message = {
    //         success: false,
    //         type: 'danger',
    //         content: 'Erro ao cadastrar objeto. Por favor, tente novamente.'
    //       };
    //
    //       this.message$.next(message);
    //     },
    //     () => {
    //       this.loading$.next(false);
    //     }
    //   );
  }

  public onClose(): void {
    this.message$ = new Subject<object>();
  }

}
