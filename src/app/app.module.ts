import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NoteService } from './services/note.service';

import { NoteComponent } from './components/note/note.component';
import { NewComponent } from './components/new/new.component';
import { TwoComponent } from './components/two/two.component';
import { OneComponent } from './components/one/one.component';
import { NewService } from './services/new.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    NewComponent,
    TwoComponent,
    OneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [NoteService, NewService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
