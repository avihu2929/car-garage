import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { ErrorComponent } from './components/error/error.component';
import { AddCarPageComponent } from './components/pages/add-car-page/add-car-page.component';
import { AddClientPageComponent } from './components/pages/add-client-page/add-client-page.component';
import { AddRepairPageComponent } from './components/pages/add-repair-page/add-repair-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { UnresolvedRepairsPageComponent } from './components/pages/unresolved-repairs-page/unresolved-repairs-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
export const routes: Routes = [ 
     { path: '', component: HomePageComponent }, // Add the route for your new page
     { path: 'main-page', component: HistoryComponent },
     {path:"add-car-page",component:AddCarPageComponent},
     {path:"add-client-page",component:AddClientPageComponent},
     {path:"add-repair-page",component:AddRepairPageComponent},
     { path: 'unresolved-repairs-page', component: UnresolvedRepairsPageComponent },
     { path: 'login-page', component: LoginPageComponent },
     { path: '**', component: ErrorComponent }


];
