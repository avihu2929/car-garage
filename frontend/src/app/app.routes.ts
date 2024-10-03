import { Routes } from '@angular/router';
import { UnsolvedRepairsPageComponent } from './components/pages/unsolved-repairs-page/unsolved-repairs-page.component';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { TestPageComponent } from './components/pages/test-page/test-page.component';
import { ErrorComponent } from './components/error/error.component';
export const routes: Routes = [ 
     { path: '', component: TestPageComponent }, // Add the route for your new page
     { path: 'main-page', component: HistoryComponent },
     { path: '**', component: ErrorComponent }

];
