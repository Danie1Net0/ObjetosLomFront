import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbRouteTabsetModule, NbTabsetModule } from '@nebular/theme';

import { LearningObjectsRoutingModule } from './learning-objects-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ObjectsCreateComponent } from './objects-create/objects-create.component';
import { GeneralTabComponent } from './objects-create/general-tab/general-tab.component';
import { LifecycleTabComponent } from './objects-create/lifecycle-tab/lifecycle-tab.component';
import { MetaMetadataTabComponent } from './objects-create/meta-metadata-tab/meta-metadata-tab.component';
import { TechnicalTabComponent } from './objects-create/technical-tab/technical-tab.component';
import { EducationalTabComponent } from './objects-create/educational-tab/educational-tab.component';
import { RightsTabComponent } from './objects-create/rights-tab/rights-tab.component';
import { RelationTabComponent } from './objects-create/relation-tab/relation-tab.component';
import { ClassificationTabComponent } from './objects-create/classification-tab/classification-tab.component';
import { AnnotationTabComponent } from './objects-create/annotation-tab/annotation-tab.component';

@NgModule({
  declarations: [
    ObjectsCreateComponent,
    GeneralTabComponent,
    LifecycleTabComponent,
    MetaMetadataTabComponent,
    TechnicalTabComponent,
    EducationalTabComponent,
    RightsTabComponent,
    RelationTabComponent,
    ClassificationTabComponent,
    AnnotationTabComponent
  ],
  imports: [
    CommonModule,
    LearningObjectsRoutingModule,
    SharedModule,
    NbTabsetModule,
    NbRouteTabsetModule
  ]
})
export class LearningObjectsModule { }
