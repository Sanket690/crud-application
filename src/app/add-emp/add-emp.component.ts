import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyapiService } from 'src/app/myapi.service';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit{

  empForm: FormGroup;

  education: string[] = [
    'Diploma',
    'Graduation',
    'Post Graduation'
  ];

  constructor(
    private _fb:FormBuilder, 
    private addemp: MyapiService, 
    private getemp: MyapiService, 
    private _dialogRef: MatDialogRef<AddEmpComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) 
    {
    this.empForm = this._fb.group({
      firstname:'',
      lastname:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    });
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }


  temp: any;

  onFormSubmit(value: any) {
    if(this.data){
      this.addemp.editEmp(this.data.firstname ,value).subscribe((deta: any) => {
        this.temp = deta;
        this._coreService.openSnackBar('Employee Details Updated...!', 'Done');
        this._dialogRef.close(true);
      })
    }
    else{
      this.addemp.addEmployee(value).subscribe((deta: any) => {
        this.temp = deta;
        this._coreService.openSnackBar('Employee Added Successfully...!', 'Done');
        this._dialogRef.close(true);
      })
    }
  }

}
