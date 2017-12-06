import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/effects/auth.effects';
import { reducers } from './auth/reducers';

import { AppRoutingModule, ConfigBasedStrategy } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // register reducer
    StoreModule.forRoot(reducers),
    // sets up the effects to be initialized once the app starts
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25}) : [],
    AuthModule.forRoot()
  ],
  providers: [ConfigBasedStrategy],
  bootstrap: [AppComponent]
})
export class AppModule { }
