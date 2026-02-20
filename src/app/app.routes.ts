import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Projects } from './features/projects/projects';
import { About } from './features/about/about';
import { Technology } from './features/technology/technology';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'technology', component: Technology },
  { path: 'projects', component: Projects },
];
