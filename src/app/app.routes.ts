import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: 'home' },
    { path: "home", component: HomeComponent },
    { path: "newuser", component: UserFormComponent },
    { path: "user/:id", component: UserViewComponent },
    { path: "updateuser/:id", component: UserFormComponent },

    { path: "**", component: HomeComponent }
];
