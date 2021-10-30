import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PolicyService } from '../services/policy.service';

@Component({
  selector: 'app-buy-policy',
  templateUrl: './buy-policy.component.html',
  styleUrls: ['./buy-policy.component.scss']
})
export class BuyPolicyComponent implements OnInit {

  title: string = "Buy Policy ESign";
  quoteId: any;
  policyForm!: FormGroup;
  policies: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private policyService: PolicyService) { }

  ngOnInit(): void {
    this.quoteId = this.route.snapshot.paramMap.get('id')
    console.log(this.quoteId);

    this.policyForm = this.fb.group({
      startDate: ["", [Validators.required]],
      acknowledge: ["", [Validators.required]]
    });

    this.policyService.getPolicyData().subscribe(data => {
      this.policies = data;
    })
  }

  buyPolicy() {
    if(this.policyForm.valid) {
      let d = new Date(this.policyForm.value.startDate);
      d.setDate(d.getDate() + 365);
      console.log(d);
      console.log(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate())
      let user = {
        "id": (parseInt(this.policies[this.policies.length - 1].id) + 1).toString(),
        "quoteId": this.quoteId,
        "startDate": this.policyForm.value.startDate,
        "endDate": d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(),
        "status": "Active"
      }
      this.policies = [...this.policies, user];
      console.log(this.policies);
      this.policyService.postPolicydata(this.policies);
      this.policyService.updateData(this.policies);
      this.router.navigate(['/home']);
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
