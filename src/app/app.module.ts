import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { TextInputComponent } from './shared/inputs/text-input/text-input.component';
import { DateInputComponent } from './shared/inputs/date-input/date-input.component';
import { SelectInputComponent } from './shared/inputs/select-input/select-input.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent,
    TextInputComponent,
    DateInputComponent,
    SelectInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
