import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PreloadingStrategy } from '@angular/router/src/router_preloader';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AuthGuardService } from './auth/services/auth-guard.service';

export class ConfigBasedStrategy implements PreloadingStrategy {
  preload(route: any, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'about',
    loadChildren: './about/about.module#AboutModule',
    canActivate: [AuthGuardService],
    data: {preload: true, title: 'About this app', depth: 1 }},
  // { path: 'login',
  //   loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: ConfigBasedStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
