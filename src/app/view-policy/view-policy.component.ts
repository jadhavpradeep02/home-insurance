import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { PolicyService } from '../services/policy.service';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss']
})
export class ViewPolicyComponent implements OnInit {

  title: string = "Policy Details";
  user_id: any;
  usersList: any = [];
  usersListBkp: any = [];
  policyData: any = [];
  policyDataBkp: any = [];
  quotesData: any = [];
  quotesDataBkp: any = [];
  show_details: boolean = false;

  constructor(private router: Router, private userService: UserService, private policyService: PolicyService, private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.userService.getUsersData().subscribe(data => {
      this.usersList = data;
      this.usersListBkp = data;
    })

    this.quoteService.getQuoteData().subscribe(data => {
      this.quotesData = data;
      this.quotesDataBkp = data;
    });

    this.policyService.getPolicyData().subscribe(data => {
      this.policyData = data;
      this.policyDataBkp = data;
    })
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  usernameSelection(event) {
    this.user_id = event.target.value;
  }

  getPolicyDataforUser() {
    let quote_ids = [];
    this.quotesData = this.quotesDataBkp;
    this.policyData = this.policyDataBkp;

    if(this.user_id) {
      this.show_details = true;

      this.quotesData = this.quotesData.filter(quote => {
        return quote.userId == this.user_id
      })
      console.log(this.quotesData);

      this.quotesData.forEach(element => {
        quote_ids.push(element.id)
      });

      console.log(quote_ids);
      this.policyData = this.policyData.filter(data => {
        return quote_ids.includes(data.quoteId)
      })
    }
  }
}
