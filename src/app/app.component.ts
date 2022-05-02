import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnterprisesService } from './services/enterprises/enterprises.service';
import { DepartmentsService } from './services/departmets/departments.service';
import { EmployeesService } from './services/employees/employees.service';
import { DepartmentsemployeesService } from './services/departmentsemployees/departmentsemployees.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  enterpriseForm: FormGroup;
  enterprises:any;
  departments: any;
  employees: any;
  personas: any;
  departmentsEmployees: any;
  
  
  constructor(
    public fb: FormBuilder,
    public enterprisesService: EnterprisesService,
    public departmentsService: DepartmentsService,
    public employeesService: EmployeesService,
    public departmentsemployeesService: DepartmentsemployeesService
  ) {
  }
  ngOnInit(): void {

    this.enterpriseForm = this.fb.group({
      id: [''],
      address: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
    
    this.enterprisesService.getAllEnterprises().subscribe({
      next: (v) => this.enterprises = v,
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
    
    /*.subscribe(resp => {
      this.enterprise = resp;
    },
      error => { console.error(error) }
    );*/

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
      this.enterprises=this.enterprises.filter(enterprise => resp.id!==enterprise.id);
      this.enterprises.push(resp);
    },
      error => { console.error(error) }
    );
  }

  eliminar(enterprise){
    this.enterprisesService.deleteEnterprise(enterprise.id).subscribe(resp=>{
      if(resp===true){
        this.enterprises.pop(enterprise)
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
  }

}
