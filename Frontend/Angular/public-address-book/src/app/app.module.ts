import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactsService } from './shared/contacts.service';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { FormComponent } from './form/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    FormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
