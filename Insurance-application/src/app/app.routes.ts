import { Routes } from '@angular/router';
import { CreateInsurance } from './create-insurance/create-insurance';
import { ReadInsurace } from './read-insurace/read-insurace';
import { UpdateDeleteInsurance } from './update-delete-insurance/update-delete-insurance';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ReadInsurace },
    { path: 'create', component: CreateInsurance },
    { path: 'update/:id', component: UpdateDeleteInsurance },
];
