import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddprescriptionService } from 'src/app/core/service/addprescription/addprescription.service';
import { DashboardService } from 'src/app/core/service/doctors/dashboard/dashboard.service';
import { DocAppointmentService } from 'src/app/core/service/doctors/doctor-appointment/doc-appointment.service';
import { DocAppointmentsService } from 'src/app/core/service/doctors/doctor-appointments/doc-appointments.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css'],
})
export class AddPrescriptionComponent implements OnInit {
  addPrescription!: FormGroup;
  submitted = false;
  num = 2;
  value: any = [];
  submit = false;
  values: any;
  id: any;
  edit: any;
  userId: any;
  patientId: any;
  doctorId: any;
  data: any;
  patient: any;
  viewPatientId: any;
  patientInfo: any = [];
  appointmentId: any;
  addPresId: any;
  presid: any;
  status = 'COMPLETED'
  profilePicture: any = 'assets/doc image/default-avatar-profile-icon-vector-18942381.jpg';
  timing: any[] = [
    {
      time: 'Morning'
    },
    {
      time: 'Afternoon'
    },
    {
      time: 'Night'
    }
  ];
  myForm: FormGroup;
  currentName: string = 'Morning';
  checkedValues: string[] = [];
  constructor(
    private fb: FormBuilder,
    private service: AddprescriptionService,
    private DashBoardService: DashboardService,
    private route: Router,
    private toastr: ToastrService,
    private rout: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private AppointmentService: DocAppointmentService,
    private appointmentsService: DocAppointmentsService
  ) {
    this.myForm = this.fb.group({
      doctorArray: this.fb.array([

      ]),
    });
  }

  ngOnInit(): void {

    //this.id = this.rout.snapshot.paramMap.get('id');
    console.log(this.id);
    localStorage.setItem('isactive', JSON.stringify(this.num))
    this.userId = localStorage.getItem('userId');
    this.doctorId = localStorage.getItem('userRoleId')
    // this.patientId = localStorage.getItem('userRoleId')
    this.addPresId = localStorage.getItem('prescriptionId');
    this.presid = localStorage.getItem('prescription')
    console.log(this.addPresId);
    this.viewPatientId = this.rout.snapshot.paramMap.get('id')
    this.myPatientInfo();
    // this.getPresId();

    this.addPrescription = <FormGroup>this.fb.group({

      // id: [null],
      // doctorId: this.doctorId,
      // patientId: this.patient,
      // appointmentId: this.appointmentid,
      prescriptionName: [null, Validators.required],
      prescription: this.fb.array([this.createPresFormGroup()]),
      status: "ACTIVE",
    });
    // this.getPresAll()
    this.getDoctorinfo();
    this.appointmentsGet();
    // this.getPrescriptionById();
  }
  clear() {
    this.submitted = false;
    this.addPrescription.reset();
  }
  isAtLeastOneCheckboxChecked = false;

  atLeastOneCheckboxChecked(): ValidatorFn {
    return (control: AbstractControl | null): ValidationErrors | null => {
      if (!control) {
        return null; // Return null if control is null
      }

      const morning = control.get('isMorning')?.value;
      const afternoon = control.get('isAfternoon')?.value;
      const evening = control.get('isEvening')?.value;
      const night = control.get('isNight')?.value;

      const atLeastOneChecked = morning || afternoon || evening || night;

      return atLeastOneChecked ? null : { atLeastOneCheckboxChecked: true };
    };
  }

  createPresFormGroup() {
    return <FormGroup>this.fb.group({
      // id: [null],
      // patientId: this.patient,
      // doctorId: this.doctorId,
      medicineName: [null, Validators.required],
      quantity: [null, Validators.required],
      noOfDays: [null, Validators.required],
      isMorning: [false],
      isAfternoon: [false],
      isEvening: [false],
      isNight: [false],
      status: 'ACTIVE',
    }, { validator: this.atLeastOneCheckboxChecked() }); // Add the custom validator here
  }
  acceptArr: any = [];
  appointmentid: any
  appointmentsGet() {
    this.spinner.show();

    this.appointmentsService.appGet().subscribe(res => {
      console.log(res);
      this.value = res.data;
      this.spinner.hide();
      this.acceptArr = this.value.filter((item: any) => item.patientId == this.addPresId);
      console.log(this.acceptArr);

      this.appointmentid = this.acceptArr[0]?.appointmentId;
      console.log(this.appointmentid);
    })

  }

  atLeastOneCheckedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const controls = control as any; // Cast the control to any
    const checkboxes = controls.controls;
    const isChecked = checkboxes.some((checkbox: AbstractControl) => checkbox.value === true);

    return isChecked ? null : { atLeastOneChecked: true };
  };
  get b() {
    return this.addPrescription.controls;
  }
  get prescription() {
    return this.addPrescription.get('prescription') as FormArray;
  }
  addprescription() {


    this.prescription.push(this.createPresFormGroup());
    // this.submitted = false;
  }
  deletePrescription(i: number) {
    const lenth = this.prescription.length
    if (lenth === 1) {
      this.toastr.warning("Can't delete the row when there is only one row", "warning");
      return;
    } else {
      if (this.prescription.length > 1) {
        this.prescription.removeAt(i);
      }
    }
  }
  get timeObjArray() {
    return this.prescription.get('timeObj') as FormArray
  }

  save(id: any) {
    this.submitted = true;
    if (this.addPrescription.invalid) {
      this.toastr.error("Please select the time field");

    }
    else {
      let obj = this.addPrescription.value;
      // obj.id=this.id
      obj.patientId = this.patient;
      obj.doctorId = this.doctorId;
      obj.appointmentId = this.appointmentid;
      obj.prescription.forEach((x: any) => {
        // x.patientId = this.patient
        // x.id=this.id

      })

      localStorage.setItem('isactive', JSON.stringify(this.num))
      this.service.createForm(this.addPrescription.value).subscribe(res => {
        this.route.navigate(['doctors/patientsprofile', id]);
        // },err=>{
        //   console.log(err.error.error.message);
        //   this.toastr.error(err.error.error.reason);  
      });
    }
  }
  onCheckChange(event: any, prescriptionIndex: number, timeIndex: number) {
    this.submit = true;
    const prescriptionArray = this.addPrescription.get('prescription') as FormArray;
    const timeObj = prescriptionArray
      .at(prescriptionIndex)
      .get('timeObj') as FormArray;

    if (event.target.checked) {
      // Push the value (choice.time) into the timeObj FormArray
      timeObj.push(new FormGroup({ "time": new FormControl(event.target.value) }));
    } else {
      // Find and remove the object with the matching name from the timeObj FormArray
      const index = timeObj.controls.findIndex(
        (ctrl) => ctrl.value.name === event.target.value
        // =======
        //     const prescriptionArray = this.addPrescription.get(
        //       'prescription'
        //     ) as FormArray;

        //     const timeObj = prescriptionArray
        //       .at(prescriptionIndex)
        //       .get('timeObj') as FormArray;

        //     if (event.target.checked) {


        //       timeObj.push(new FormControl(event.target.value));

        //       console.log(event.target.value);
        //     } else {


        //       const index = timeObj.controls.findIndex(
        //         (ctrl) => ctrl.value === event.target.value
        // >>>>>>> 1faf155901fc533ed5ea1833146ba6a632b7ca60
      );
      if (index !== -1) {
        timeObj.removeAt(index);
      }
    }


  }
  // getPresAll(){
  //   this.service.getForm().subscribe(res=>{
  //     this.values=res.data
  //   })
  // }

  //   getPresId() {
  //   console.log(this.presid);

  //     this.service.GetFormid(this.presid).subscribe(res => {
  //       this.edit = res.data
  //       console.log(res,'getPresId');

  //       this.addPrescription.patchValue({
  //         id: this.edit.id,       
  //         prescriptionName: this.edit.prescriptionName,
  //         prescription:this.prescriptionPatch()

  //       })
  //     })

  // }
  // prescriptionPatch(): void {

  // const { prescription } = this.presid;
  // if (!Array.isArray(prescription)) {
  //   console.error('this.doctorGet.education is not an array');
  //   return;
  // }
  //     this.prescription.clear();
  //     prescription.forEach((data: any, index: number) => {
  //       data.index = index;
  //       const formGroup = this.fb.group({
  //         medicineName: this.data.medicineName,
  //         quantity: this.data.quantity,
  //         noOfDays: this.data.noOfDays,
  //         timeObj: this.data.timeObj,
  //         status: 'ACTIVE',
  //       });
  //       this.prescription.push(formGroup);
  //     });

  // }

  // getPresUpdate() {
  //   this.submitted = true;
  //   let obj = this.addPrescription.value;
  //   // obj.patientId = "4e910e0e-adaf-41aa-a054-295c62ea1914";
  //   if (this.addPrescription.invalid) {
  //     return
  //   }
  //   else {
  //     this.service.updateForm(this.addPrescription.value).subscribe(res => {
  //       this.getPresId();
  //       this.toastr.success("successfully")

  //     })


  //   }

  // }
  image: any;
  view: any;
  imageGet: any = [];
  imagearr: any = [];
  doctorData = {}
  addDoctor(doctorData: any) {
    const doctorGroup = this.fb.group({

      patientImage: [doctorData.patientImage.patientImage],
    });
    this.doctorArray.push(doctorGroup);
  }

  get doctorArray(): FormArray {
    return this.myForm.get('doctorArray') as FormArray;
  }
  imageArr: any = []
  myPatientInfo() {
    this.spinner.show();
    this.AppointmentService.getPatient(this.addPresId).subscribe(res => {

      this.patientInfo = res.data;
      this.patient = this.patientInfo.patientId;

      // for (let i = 0; i < this.patientInfo?.length; i++) {
      if (this.patientInfo.patientImage != null) {
        const doctorData = {
          patientImage: atob(this.patientInfo.patientImage)
        };
        this.patientInfo.doctorData = doctorData;
      }
      this.imageArr.push(this.patientInfo);

      this.spinner.hide();
      // console.log(this.patientInfo);
    })
  }
  viewPatient(patientId: any) {
    // this.patientID=patientId;
    this.route.navigate(['/doctors/patientsprofile', patientId])
  }
  getDoctorinfo() {
    this.DashBoardService.getDoctorid().subscribe(res => {
      this.values = res.data
    })
  }



  // getPrescriptionById() {
  //   if (this.presid) {
  //     this.service.GetFormid(this.presid).subscribe(
  //       (res) => {
  //         if (res) {
  //           this.edit = res.data;
  //           this.patchFormWithPrescriptionData(this.edit);

  //         } else {
  //           console.error('Prescription data not found.');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching prescription data:', error);
  //       }
  //     );
  //   }
  // }
  //   patchFormWithPrescriptionData(prescriptionData: any) {
  //     if (prescriptionData.length == 0) { }
  //     else{
  //     if (prescriptionData) {
  //       this.addPrescription.patchValue({
  //         id: prescriptionData.prescriptionid,       
  //         prescriptionName: prescriptionData.prescriptionName,
  //         // prescription: this.patchPrescriptions(prescriptionData.prescriptionNameDto),


  //       });
  //       let prescription = this.addPrescription.get('prescription') as FormArray;
  //       prescription.controls = [];
  //       prescriptionData.prescriptionNameDto.forEach((x:any)=>{
  //         prescription.push(this.createPresFormGroup());
  //       })
  //       prescriptionData.prescriptionNameDto.forEach((data:any,index:any)=>{
  //         prescription.at(index).patchValue({
  //           id: data.prescriptionNameid,
  //           medicineName: data.medicineName,
  //           quantity: data.quantity,
  //           noOfDays: data.noOfDays,
  //           status: 'ACTIVE',  // Assuming a default value
  //            timeObj: this.patchTimeObjects(data.prescriptionTime)
  //         })
  //       })
  //     } else {
  //       console.error('Prescription data not found.');
  //     }
  //   }
  // }
  // patchPrescriptions(prescriptionData: any[]): FormGroup[] {
  //   return prescriptionData.map(data => {
  //     return this.fb.group({
  //       id: data.prescriptionNameid,
  //       medicineName: data.medicineName,
  //       quantity: data.quantity,
  //       noOfDays: data.noOfDays,
  //       status: 'ACTIVE',  // Assuming a default value
  //       timeObj: this.patchTimeObjects(data.prescriptionTime)
  //     });
  //   });
  // }

  // patchTimeObjects(timeObjects: any) {
  //   let timeObject = this.prescription.get('timeObj') as FormArray;
  //   timeObject.controls =[]
  //   timeObjects.forEach((x:any)=>{
  //     timeObject.push(new FormGroup({ "time": new FormControl() }))
  //   })
  //   timeObjects.forEach((x:any,i:any)=>{
  //     timeObject.at(i).patchValue({
  //       time:x.prescriptionTime
  //     })
  //   })
  // return timeObjects.map(data => {
  //   return this.fb.group({
  //     time: data.prescriptionTime
  //   });   
  // });

  // patchTimeObjects(timeObjects: any) {
  //   const timeObject = this.prescription.at(0).get('timeObj') as FormArray; // Assuming you want to patch the time for the first prescription item

  //   // timeObject.clear(); // Clear any existing time objects

  //   timeObjects.forEach((timeObj: any) => {
  //     timeObject.push(this.fb.group({
  //       prescriptionTime: timeObj.prescriptionTime,
  //       prescriptionTimeId:timeObj.prescriptionTimeId,
  //       prescriptionNameId:timeObj.prescriptionNameId
  //     }));
  //   });
  // }
}










