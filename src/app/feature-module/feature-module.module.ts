import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FeatureModuleComponent } from './feature-module.component';
import { SharedModule } from '../shared/module/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FeatureModuleComponent],
  imports: [CommonModule, FeatureModuleRoutingModule, HttpClientModule, SharedModule, ReactiveFormsModule],
})
export class FeatureModuleModule { }
