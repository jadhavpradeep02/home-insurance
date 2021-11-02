import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../services/quote.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.scss']
})
export class ViewQuoteComponent implements OnInit {

  quotesData: any = [];
  title: string = "Quote Details";
  usersList: any = [];
  show_details: boolean = false;
  user_id: any;
  backupData: any = [];

  constructor(private quoteService: QuoteService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.quoteService.getQuoteData().subscribe(data => {
      this.quotesData = data;
      this.backupData = data;
    });

    this.userService.getUsersData().subscribe(data => {
      this.usersList = data;
    });
  }

  usernameSelection(event) {
    this.user_id = event.target.value;
  }

  getQuoteDataforUser() {
    this.quotesData = this.backupData;
    if(this.user_id) {
      this.quotesData = this.quotesData.filter(data => {
        return data.userId == this.user_id;
      });
      this.show_details = true;
    } else {
      this.show_details = false;
    }
  }

  buyPolicy(id) {
    this.router.navigate(['/buy-policy', id]);
  }
}
