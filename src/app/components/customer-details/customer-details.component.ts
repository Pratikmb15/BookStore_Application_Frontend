import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  isExist :boolean=false;
  error: any;
  @Output() UpdateAutoRefresh = new EventEmitter();

  
  
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
    
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
    
  }
  async ngOnInit() {
    await  this.getCustomer();
  }

  toggleDetails() {
    this.isOpen = !this.isOpen;
  }
  getCustomer(){
    return this.custService.getCustomerData().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.customerDetails=res.data;
        this.isExist=true;
        // ✅ Patch form with latest data
      if (this.customerForm) {
        this.customerForm.patchValue({
          fullName: this.customerDetails.fullName,
          mobileNumber: this.customerDetails.mobileNumber,
          address: this.customerDetails.address,
          city: this.customerDetails.city,
          state: this.customerDetails.state
        });
      }
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
    if(this.isExist){
      return this.custService.updateCustomerDetails(this.customerDetails.customerId,reqData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.snackBar.open('Customer Details Saved Successfully', '', { duration: 5000 });
          this.isOpen=false;
          this.UpdateAutoRefresh.emit();
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
    return this.custService.addCustomerDetails(reqData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.snackBar.open('Customer Details Saved Successfully', '', { duration: 5000 });
        this.isOpen=false;
        this.UpdateAutoRefresh.emit();
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
  cancel(){
    this.isEditing=false;
  }
  continue() {
    // Add logic here if needed when user clicks continue
    this.UpdateAutoRefresh.emit();
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
