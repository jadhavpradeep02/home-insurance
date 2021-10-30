import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponentComponent } from './home-component/home-component.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { ViewQuoteComponent } from './view-quote/view-quote.component';
import { ViewPolicyComponent } from './view-policy/view-policy.component';
import { BuyPolicyComponent } from './buy-policy/buy-policy.component';

const routes: Routes = [
  { path: "home", component: HomeComponentComponent },
  { path: "register-user", component: RegisterUserComponent },
  { path: "get-quote", component: GetQuoteComponent },
  { path: "view-quote", component: ViewQuoteComponent },
  { path: "view-policy", component: ViewPolicyComponent },
  { path: "buy-policy/:id", component: BuyPolicyComponent },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
