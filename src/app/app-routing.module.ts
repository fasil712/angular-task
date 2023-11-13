import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './components/note/note.component';
import { NewComponent } from './components/new/new.component';
import { OneComponent } from './components/one/one.component';
import { TwoComponent } from './components/two/two.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/noteapp' },
  { path: 'noteapp', component: NoteComponent },
  { path: 'newapp', component: NewComponent },
  { path: 'oneapp', component: OneComponent },
  { path: 'twoapp', component: TwoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
