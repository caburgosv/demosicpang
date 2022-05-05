import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EnterprisesService } from './services/enterprises/enterprises.service';
import { DepartmentsService } from './services/departmets/departments.service';
import { EmployeesService } from './services/employees/employees.service';
import { DepartmentsemployeesService } from './services/departmentsemployees/departmentsemployees.service';
import { MatTableDataSource } from '@angular/material/table';
import { AfterContentInit  } from '@angular/core';
//import {ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit  {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  enterpriseForm: FormGroup;
  enterprises: any;
  departments: any;
  employees: any;
  personas: any;
  departmentsEmployees: any;
  dataSource: MatTableDataSource<any>;
  
  displayedColumns = ['id','name','address','phone','status','state-name'];
  
  panelOpenState = false;
  
  constructor(
    public fb: FormBuilder,
    public enterprisesService: EnterprisesService,
    public departmentsService: DepartmentsService,
    public employeesService: EmployeesService,
    public departmentsemployeesService: DepartmentsemployeesService//,
    //private cdref: ChangeDetectorRef
  ) {
  }

  ngAfterContentInit(): void {
    this.setDataAndPagination();
    //this.cdref.detectChanges();
  }     

  ngOnInit(): void {

    this.enterpriseForm = this.fb.group({
      id: [''],
      address: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['1']
    });

    this.enterprisesService.getAllEnterprises().subscribe(resp => {
      this.enterprises = resp;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    );
    this.departmentsService.getAllDepartments().subscribe({
      next: (v) => this.departments = v,
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });

    this.employeesService.getAllEmployees().subscribe({
      next: (v) => this.employees = v,
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });

    this.departmentsemployeesService.getAllDepartmentsEmployeesService().subscribe({
      next: (v) => this.departmentsEmployees = v,
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }

  guardar(): void {
    this.enterprisesService.saveEnterprise(this.enterpriseForm.value).subscribe(resp => {
      this.enterpriseForm.reset();
      this.enterpriseForm.setErrors(null);
      this.enterprises=this.enterprises.filter(enterprise => resp.id!==enterprise.id);
      this.enterprises.push(resp);
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    );
  }

  eliminar(enterprise){
    this.enterprisesService.deleteEnterprise(enterprise.id).subscribe(resp=>{
      if(resp===true){
        this.enterprises.pop(enterprise)
        this.setDataAndPagination();
      }
    });
  }

  editar(enterprise){
    this.enterpriseForm.setValue({
      id:enterprise.id,
      address: enterprise.address,
      name: enterprise.name ,
      phone: enterprise.phone,
      status: enterprise.status
    });
    this.panelOpenState = !this.panelOpenState;
  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.enterprises);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
