import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmpComponent } from './add-emp/add-emp.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MyapiService } from './myapi.service';
import { CoreService } from './core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project_2';

  displayedColumns: string[] = [
    'firstname', 
    'lastname', 
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package'
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _dialog: MatDialog, 
    private getemp: MyapiService, 
    private delemp: MyapiService,
    private _coreService: CoreService
    ) { }

  openAddEmpForm() {
    const dialogRef =  this._dialog.open(AddEmpComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.refresh();
        }
      }
    });
  }


  ngOnInit(){
    this.refresh();
  }

  temp2: any;

  delEmp(name: string) {
    this.delemp.deleteEmp(name).subscribe( deta => {
      console.log(deta);
      this.temp2=deta;
      this._coreService.openSnackBar('Employee Deleted...!', 'Done');
      this.refresh();
    });
  }

  temp:any;
  refresh() {
    this.getemp.getData().subscribe( deta => {
      console.log(deta);
      this.temp=deta;
    })
  }


  editEmp(data: any) {
    const dialogRef = this._dialog.open(AddEmpComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.refresh();
        }
      }
    });
  }


}

