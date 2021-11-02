import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { QuoteDetailsService } from '../services/quoteDetails.service';

export class Location {
  constructor(
    public residenceType: string,
    public address: string,
    public residenceUse: string
  ) { }
}

export class Property {
  constructor(
    public marketValue: string,
    public homeYear: string,
    public squareFootage: string,
    public dwellingType: string,
    public roofMaterial: string,
    public garageType: string,
    public noOfBaths: string,
    public noHalfBaths: string,
    public swimmingPool: string,
  ) { }
}

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.scss']
})
export class GetQuoteComponent implements OnInit {

  @Output() locationDate = new EventEmitter<Location>();
  @Output() propertyData = new EventEmitter<Property>();
  title: string = "Get Quote";
  locationForm!: FormGroup;
  //homeownerForm!: FormGroup;
  propertyForm!: FormGroup;
  location_step = false;
  //homeowner_step = false;
  property_step = false;
  step = 1;
  usersList : any = [];
  quotedetailsList : any = [];
  selected_user_id: number;
  username_msg: boolean = false;
  residence_types: any = ['Single-Family Home', 'Condo', 'Townhouse', 'Rowhouse', 'Duplex', 'Apartment'];
  residence_use: any = ["Primary", "Secondary", "Rental Property"];
  dwellig_style: any = ["1 story", "1.5 story", "2 story", "2.5 story", "3 story"];
  roof_material: any = ["Concrete", "Clay", "Rubber", "Steel", "Tin", "Wood"];
  garage_types: any = ["Attached", "Detached", "Basement", "Built-in", "None"];
  bath_numbers: any = ["1", "2", "3", "more"];

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private quoteDetailsService: QuoteDetailsService) { }

  ngOnInit(): void {
    this.userService.currentMessage.subscribe(data => {
      this.usersList = data;
      // console.log("this.usersData", this.usersList);
    });

    this.quoteDetailsService.getQuoteDetaislData().subscribe(data => {
      this.quotedetailsList = data;
      // console.log("this.quotedetailsList", this.quotedetailsList);
    })

    this.locationForm = this.formBuilder.group({
      residenceType: ['', Validators.required],
      address: ['', Validators.required],
      residenceUse: ['', Validators.required]
    });

    // this.homeownerForm = this.formBuilder.group({
    //   first_name: ['', Validators.required],
    //   last_name: ['', Validators.required],
    //   date_of_birth: ['',Validators.required],
    //   is_retired: ['', Validators.required],
    //   social_security_number: ['', Validators.required],
    //   email: ['',Validators.required]
    // });

    this.propertyForm = this.formBuilder.group({
      marketValue: ['', Validators.required],
      homeYear: ['', Validators.required],
      squareFootage: ['',Validators.required],
      dwellingType: ['', Validators.required],
      roofMaterial: ['', Validators.required],
      garageType: ['',Validators.required],
      noOfBaths: ['',Validators.required],
      noHalfBaths: ['',Validators.required],
      swimmingPool: ['',Validators.required]
    });
  }

  onSubmit() {
    this.locationDate.emit(
      new Location(
        this.locationForm.value.residenceType,
        this.locationForm.value.address,
        this.locationForm.value.residenceUse
      )
    );
    this.propertyData.emit(
      new Property(
        this.propertyForm.value.marketValue,
        this.propertyForm.value.homeYear,
        this.propertyForm.value.squareFootage,
        this.propertyForm.value.dwellingType,
        this.propertyForm.value.roofMaterial,
        this.propertyForm.value.garageType,
        this.propertyForm.value.noOfBaths,
        this.propertyForm.value.noHalfBaths,
        this.propertyForm.value.swimmingPool
      )
    );
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  next(){
    if(this.step==1){
          this.location_step = true;
          if (this.locationForm.invalid) { return  }
          this.step++
    }
    // if(this.step==2){
    //     this.homeowner_step = true;
    //     if (this.homeownerForm.invalid) { return }
    //     this.step++;
    // }
  }

  previous(){
    this.step--
    if(this.step==1){
      this.location_step = false;
    }
    // if(this.step==2){
    //   this.homeowner_step = false;
    // }
  }

  usernameSelection(event) {
    console.log(event.target.value);
    this.username_msg = false;
    this.selected_user_id = event.target.value;
  }

  getQuote(){
    if(this.step == 2){
      this.property_step = true;
      if (this.propertyForm.invalid) { return }
    }
    console.log(this.selected_user_id);
    if(!this.selected_user_id) {
      this.username_msg = true;
      window.scrollTo(0, 0);
      return;
    }
    if (this.locationForm.valid && this.propertyForm.valid) {
      let quoteDetails = {
        "quoteDetailsId": (parseInt(this.quotedetailsList[this.quotedetailsList.length - 1].quoteDetailsId) + 1).toString(),
        "userId": this.selected_user_id,
        "residenceType": this.locationForm.value.residenceType,
        "address": this.locationForm.value.address,
        "residenceUse": this.locationForm.value.residenceUse,
        "marketValue": this.propertyForm.value.marketValue,
        "homeYear": this.propertyForm.value.homeYear,
        "squareFootage": this.propertyForm.value.squareFootage,
        "dwellingType": this.propertyForm.value.dwellingType,
        "roofMaterial": this.propertyForm.value.roofMaterial,
        "garageType": this.propertyForm.value.garageType,
        "noOfBaths": this.propertyForm.value.noOfBaths,
        "noHalfBaths": this.propertyForm.value.noHalfBaths,
        "swimmingPool": this.propertyForm.value.swimmingPool
      }
      this.quotedetailsList = [...this.quotedetailsList, quoteDetails];
      console.log(this.quotedetailsList);
      this.quoteDetailsService.postQuoteDetailsData(this.quotedetailsList);
      this.quoteDetailsService.updateData(this.quotedetailsList);
      this.router.navigate(['/home']);
    }

  }
}
