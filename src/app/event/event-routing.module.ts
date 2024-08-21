import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: EventListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: EventFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EventFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }

