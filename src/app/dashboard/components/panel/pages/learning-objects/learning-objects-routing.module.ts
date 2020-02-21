import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjectsCreateComponent } from './objects-create/objects-create.component';
import { GeneralTabComponent } from './objects-create/general-tab/general-tab.component';
import { LifecycleTabComponent } from './objects-create/lifecycle-tab/lifecycle-tab.component';
import { MetaMetadataTabComponent } from './objects-create/meta-metadata-tab/meta-metadata-tab.component';
import { TechnicalTabComponent } from './objects-create/technical-tab/technical-tab.component';
import { EducationalTabComponent } from './objects-create/educational-tab/educational-tab.component';
import { RightsTabComponent } from './objects-create/rights-tab/rights-tab.component';
import { RelationTabComponent } from './objects-create/relation-tab/relation-tab.component';
import { AnnotationTabComponent } from './objects-create/annotation-tab/annotation-tab.component';
import { ClassificationTabComponent } from './objects-create/classification-tab/classification-tab.component';

const routes: Routes = [
  {
    path: 'novo',
    component: ObjectsCreateComponent,
    children: [
      {
        path: 'geral',
        component: GeneralTabComponent
      },
      {
        path: 'ciclo-de-vida',
        component: LifecycleTabComponent
      },
      {
        path: 'metadados',
        component: MetaMetadataTabComponent
      },
      {
        path: 'tecnico',
        component: TechnicalTabComponent
      },
      {
        path: 'educacional',
        component: EducationalTabComponent
      },
      {
        path: 'direitos',
        component: RightsTabComponent
      },
      {
        path: 'relacao',
        component: RelationTabComponent
      },
      {
        path: 'annotation',
        component: AnnotationTabComponent
      },
      {
        path: 'classification',
        component: ClassificationTabComponent
      },
      {
        path: '',
        component: GeneralTabComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningObjectsRoutingModule { }
