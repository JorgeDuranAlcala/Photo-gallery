import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path:'photos', component: PhotoListComponent, canActivate: [AuthGuard] , data: { animation: 'isRight' }  },
  { path:'addPhotos', component: PhotoFormComponent, data: { animation: 'isLeft' }  , canActivate: [AuthGuard] },
  { path:'previewPhoto/:id', component: PhotoPreviewComponent },
  { path:'signUp', component: SignUpComponent, data: { animation: 'isLeft' } },
  { path: 'logIn', component: LogInComponent, data: { animation: 'isLeft' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
