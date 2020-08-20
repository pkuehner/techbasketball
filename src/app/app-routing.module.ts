import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from 'src/app/home/home.component';
import {AboutComponent} from 'src/app/about/about.component';
import {ContactComponent} from 'src/app/contact/contact.component';
import {PastPostsComponent} from 'src/app/past-posts/past-posts.component';
import {AuthorPostComponent} from 'src/app/author-post/author-post.component';
import {ViewPostComponent} from 'src/app/view-post/view-post.component';
import {LoginComponent} from 'src/app/login/login.component';
import {
    AuthGuardService as AuthGuard
} from './service/authguard.service';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'}, //default route
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'posts', component: PastPostsComponent},
    {path: 'post/:id', component: ViewPostComponent},
    {path: 'author-post', component: AuthorPostComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
