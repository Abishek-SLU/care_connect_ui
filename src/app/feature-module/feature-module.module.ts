import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FeatureModuleComponent } from './feature-module.component';
import { SharedModule } from '../shared/module/shared.module';

@NgModule({
  declarations: [FeatureModuleComponent],
  imports: [CommonModule, FeatureModuleRoutingModule, SharedModule],
})
export class FeatureModuleModule {}
