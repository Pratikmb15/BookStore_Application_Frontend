import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/Customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface customer {
  customerId: number,
  fullName: string,
  mobileNumber: string
  address: string,
  city: string,
  state: string,
  userId: number
}
@Component({
  selector: 'app-customer-details',
  standalone: false,
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit{
  isOpen = false;
  isEditing: boolean = false;
  customerForm!: FormGroup;
  customerDetails:customer={
    customerId: 0,
    fullName: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    userId: 0
  };

  constructor(private fb: FormBuilder, private custService: CustomerService, private snackBar: MatSnackBar) {
    
    // this.customerForm = this.fb.group({
    //   fullName: ['', Validators.required],
    //   mobileNumber: ['', Validators.required],
    //   address: ['', Validators.required],
    //   city: ['', Validators.required],
    //   state: ['', Validators.required]
    // });
    
  }
  async ngOnInit() {
    await  this.getCustomer();
    this.customerForm = this.fb.group({
      fullName: [this.customerDetails.fullName, Validators.required],
      mobileNumber: [this.customerDetails.mobileNumber, Validators.required],
      address: [this.customerDetails.address, Validators.required],
      city: [this.customerDetails.city, Validators.required],
      state: [this.customerDetails.state, Validators.required]
    });
  }

  toggleDetails() {
    this.isOpen = !this.isOpen;
  }
  getCustomer(){
    return this.custService.getCustomerData().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.customerDetails=res.data;
      },
      error: (err) => {
        console.error('Failed to Fetch Customer Details :', err);
        // this.snackBar.open('Failed to Fetch Customer Details !', '', { duration: 5000 });
        if (err.error) {
          console.error('Server Response:', err.error);
        }
      }
    })
  }
  submitForm() {
    const reqData = {
      fullName: this.customerForm.value.fullName,
      mobileNumber: this.customerForm.value.mobileNumber,
      address: this.customerForm.value.address,
      city: this.customerForm.value.city,
      state: this.customerForm.value.state
    };
    return this.custService.addCustomerDetails(reqData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.snackBar.open('Customer Details Saved Successfully', '', { duration: 5000 });
        this.isOpen=false;
      }
      , error: (err) => {
        console.error('Failed to Save Customer Details :', err);
        this.snackBar.open('Failed to Save Customer Details !', '', { duration: 5000 });
        if (err.error) {
          console.error('Server Response:', err.error);
        }
      }
    })
  }
  continue() {
    // Add logic here if needed when user clicks continue
    this.snackBar.open('Proceeding with saved customer details', '', { duration: 3000 });
  }
  get fullName() {
    return this.customerForm.get('fullName');
  }
  get mobileNumber() {
    return this.customerForm.get('mobileNumber');
  }
  get address() {
    return this.customerForm.get('address');
  }
  get city() {
    return this.customerForm.get('city');
  }
  get state() {
    return this.customerForm.get('state');
  }
}
