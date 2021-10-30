import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { ViewQuoteComponent } from './view-quote/view-quote.component';
import { BuyPolicyComponent } from './buy-policy/buy-policy.component';
import { ViewPolicyComponent } from './view-policy/view-policy.component';
import { UserService } from './services/user.service';
import { QuoteDetailsService } from './services/quoteDetails.service';
import { QuoteService } from './services/quote.service';
@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    HomeComponentComponent,
    GetQuoteComponent,
    ViewQuoteComponent,
    BuyPolicyComponent,
    ViewPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, QuoteDetailsService, QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
