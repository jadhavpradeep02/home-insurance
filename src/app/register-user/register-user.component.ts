import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

export class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public dob: string
  ) { }
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  @Output() userdata = new EventEmitter<User>();
  usersData: any;
  userForm!: FormGroup;
  title = "User Registration";

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      email: ["", [Validators.required]],
      dob: ["", [Validators.required]],
    });

    this.userService.getUsersData().subscribe(data => {
      this.usersData = data;
      console.log("this.usersData", this.usersData);
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.userdata.emit(
      new User(
        this.userForm.value.username,
        this.userForm.value.password,
        this.userForm.value.email,
        this.userForm.value.dob
      )
    );
  }

  addUser(){
    console.log("addUser");
    if (this.userForm.valid) {
      let user = {
        "userId": (parseInt(this.usersData[this.usersData.length - 1].userId) + 1).toString(),
        "username": this.userForm.value.username,
        "password": this.userForm.value.password,
        "email": this.userForm.value.email,
        "dob": this.userForm.value.dob
      }
      this.usersData = [...this.usersData, user];
      console.log(this.usersData);
      this.userService.postUsersdata(this.usersData);
      this.userService.updateData(this.usersData);
      this.router.navigate(['/home']);
    }
  }
}
