import { Routes } from '@angular/router';
import { UnsolvedRepairsPageComponent } from './components/pages/unsolved-repairs-page/unsolved-repairs-page.component';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { TestPageComponent } from './components/pages/test-page/test-page.component';
import { ErrorComponent } from './components/error/error.component';
import { AddCarPageComponent } from './components/pages/add-car-page/add-car-page.component';
import { AddClientPageComponent } from './components/pages/add-client-page/add-client-page.component';
import { AddRepairPageComponent } from './components/pages/add-repair-page/add-repair-page.component';
export const routes: Routes = [ 
     { path: '', component: TestPageComponent }, // Add the route for your new page
     { path: 'main-page', component: HistoryComponent },
     {path:"add-car-page",component:AddCarPageComponent},
     {path:"add-client-page",component:AddClientPageComponent},
     {path:"add-repair-page",component:AddRepairPageComponent},
     { path: '**', component: ErrorComponent }


];
