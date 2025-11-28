import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  appointments: any[] = [];
  patients: any[] = [];

  constructor() {}

  ngOnInit():import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MyPatientsService } from 'src/app/core/service/doctors/my-patients/my-patients.service';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  appointments : any = [];
  patients :  any = [];
  values:any=[];
  docId:any=[];
  isactive = localStorage.getItem('isactive');
  active = localStorage.getItem('active');
  activeKey:any;
  myForm: FormGroup;
  constructor(public commonService:CommonService,
    private service:MyPatientsService,
    private route : Router,
    private modalservice:NgbModal,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    private fb:FormBuilder
    ) {this.myForm = this.fb.group({
      doctorArray: this.fb.array([
  
      ]),
    }); }

  ngOnInit(): void {
    this.getMypatients();
    this.getcompletedPatient();
    // this.getPatients();
    // this.getAppointments();
    this.activeKey = 1;    
    if(this.isactive != null || this.isactive != undefined ){
      this.activeKey = Number(this.isactive);
      localStorage.removeItem('isactive')
    }
    if(this.active != null || this.active !=undefined ){
      console.log(this.activeKey);
      this.activeKey = Number(this.active);
      localStorage.removeItem('active')
    }
    
  }

  // getAppointments() {
  //   this.commonService.getAppointments()
  //     .subscribe(res=>{
  //       this.appointments = res;
  //       let scope = this;
  //       this.appointments.forEach((index:any)=>{
  //         let filter = scope.patients.filter((a:any)=>a.key === index.patient_key);
  //         if(filter.length != 0) {
  //           index['patients'] = filter[0];
  //         }
  //       })
  //       this.appointments = this.appointments.filter((a:any)=>a.status === 'accept');
  //     })
  // }

  // getPatients() {
  //   this.commonService.getpatients()
  //   .subscribe(res=>{
  //     this.patients = res;
  //   })
  // }
  imageGet:any=[];
  imagearr:any[]=[];
  doctorData={}
  addDoctor(doctorData: any) {
    const doctorGroup = this.fb.group({
    
      patientImage: [doctorData.patientImage.patientImage],
    });
    this.doctorArray.push(doctorGroup);
  }

  get doctorArray(): FormArray {
    return this.myForm.get('doctorArray') as FormArray;
  }
  data:any
  // imageArr:any=[];
  getMypatients() {
    this.spinner.show();
    
    this.service.getForm().subscribe(
      (res) => {
        this.patients = res.data;
        this.spinner.hide();
        for (let i = 0; i < this.patients?.length; i++) {
          if (this.patients[i].patientImage != null) {
            const doctorData = {
              patientImage: atob(this.patients[i].patientImage)
            };
            this.patients[i].doctorData = doctorData;
          }
          this.imagearr.push(this.patients[i]);
        }
        // this.data = res.data.completedList;
        
      },
      (err) => {
        let error = err.error.error.reason;
        console.log(error);
        if (error != null) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
  })
  }
  completed:any=[]
getcompletedPatient(){
  this.spinner.show();
  this.service.getCompleted().subscribe((res)=>{
    this.completed=res.data
    this.spinner.hide();
        for (let i = 0; i < this.completed?.length; i++) {
          if (this.completed[i].patientImage != null) {
            const doctorData = {
              patientImage: atob(this.completed[i].patientImage)
            };
            this.completed[i].doctorData = doctorData;
          }
          this.imagearr.push(this.completed[i]);
          
        }// C// Call the function to patch image data
      },
      (err) => {
        let error = err.error.error.reason;
        console.log(error);
        if (error != null) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
  })
}
  patchImage() {
    for (let i = 0; i < this.patients?.length; i++) {
      if (this.patients[i].patientImage !== null) {
        const doctorData = {
          patientImage: atob(this.patients[i].patientImage),
        };
        this.patients[i].doctorData = doctorData;
        console.log('doctorData', doctorData, 'doctorData');
      }
      this.imagearr.push(this.patients[i]);
    }
  }
viewPatient(patientId:any){
  // this.patientID=patientId;
  this.route.navigate(['/doctors/patientsprofile',patientId])
}
}
 void {
    this.loadPatients();
    this.loadAppointments();
    this.filterAcceptedPatients();
  }

  // Load Patients
  loadPatients() {
    const savedPatients = localStorage.getItem('patientsData');
    if (savedPatients) {
      this.patients = JSON.parse(savedPatients);
    } else {
      this.patients = [
        {
          key: 'P1001',
          name: 'Richard Wilson',
          img: 'assets/img/patients/patient.jpg',
          address: '806 Twin Willow Lane',
          phone: '1 202-555-0125',
          age: 40,
          bloodgroup: 'O+',
          type: 'Regular'
        },
        {
          key: 'P1002',
          name: 'Champagne',
          img: 'assets/img/patients/patient2.jpg',
          address: '21 Broadway, NY',
          phone: '1 202-555-0177',
          age: 32,
          bloodgroup: 'A+',
          type: 'New'
        }
      ];
      localStorage.setItem('patientsData', JSON.stringify(this.patients));
    }
  }

  // Load Appointments
  loadAppointments() {
    const savedAppointments = localStorage.getItem('appointmentsData');
    if (savedAppointments) {
      this.appointments = JSON.parse(savedAppointments);
    } else {
      // Example: one accepted and one active
      this.appointments = [
        { id: 1, patient_key: 'P1001', status: 'accept' },
        { id: 2, patient_key: 'P1002', status: 'active' }
      ];
      localStorage.setItem('appointmentsData', JSON.stringify(this.appointments));
    }
  }

  // Filter accepted patients
  filterAcceptedPatients() {
    const acceptedAppointments = this.appointments.filter(a => a.status === 'accept');
    const acceptedPatientKeys = acceptedAppointments.map(a => a.patient_key);
    this.patients = this.patients.filter(p => acceptedPatientKeys.includes(p.key));
  }
}