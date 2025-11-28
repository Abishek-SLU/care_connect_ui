import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddprescriptionService } from 'src/app/core/service/addprescription/addprescription.service';
import { DashboardService } from 'src/app/core/service/doctors/dashboard/dashboard.service';
import { DocAppointmentService } from 'src/app/core/service/doctors/doctor-appointment/doc-appointment.service';
import { DocAppointmentsService } from 'src/app/core/service/doctors/doctor-appointments/doc-appointments.service';

@Component({
  selector: 'app-edit-prescription',
  templateUrl: './edit-prescription.component.html',
  styleUrls: ['./edit-prescription.component.css']
})
export class EditPrescriptionComponent implements OnInit {
  editPrescription!: FormGroup;
  submitted = false;
  num = 2;
  value: any;
  ischeckout: boolean = true;
  submit = false;
  values: any;
  addPresId: any;
  patientInfo: any;
  patient: any;
  patientId: any;
  prescriptionId: any
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
  ]
  myForm: any;
  constructor(
    private service: AddprescriptionService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private AppointmentService: DocAppointmentService,
    private appointmentsService: DocAppointmentsService,
    private DashBoardService: DashboardService,
    private route: Router
  ) {
    this.myForm = this.fb.group({
      doctorArray: this.fb.array([

      ]),
    });
  }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('userRoleId')
    this.prescriptionId = localStorage.getItem('prescriptionId');
    this.presid = localStorage.getItem('prescription');
    this.patientId = localStorage.getItem('patientId')
    console.log(this.prescriptionId);

    this.editPrescription = <FormGroup>this.fb.group({

      // id: [null],
      // doctorId: this.doctorId,
      // patientId: this.patient,
      // appointmentId: this.appointmentid,
      prescriptionName: [null, Validators.required],
      status: "ACTIVE",
      prescription: this.fb.array([this.createPresFormGroup()]),
    });
    this.getPrescriptionById();
    // this.myPatientInfo();
    this.getDoctorinfo();
    this.appointmentsGet();
  }
  get b() {
    return this.editPrescription.controls;
  }
  get prescription() {
    return this.editPrescription.get('prescription') as FormArray;
  }
  editAddprescription() {
    this.submitted = true;
    if (this.prescription.invalid) {
      return
    }
    this.prescription.push(this.createPresFormGroup());
  }
  onCheckChange(event: any, prescriptionIndex: number, timeIndex: number) {
    this.submit = true;
    const prescriptionArray = this.editPrescription.get('prescription') as FormArray;
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
  deletePrescription(i: number) {
    if (this.prescription.length == 1) {
    } else {
      if (this.prescription.length > 1) {
        this.prescription.removeAt(i);
      }
    }
  }
  get timeObjArray() {
    return this.prescription.get('timeObj') as FormArray
  }
  save() { }
  presid: any;
  edit: any;
  createPresFormGroup() {
    return <FormGroup>this.fb.group({
      // id: [null],
      medicineName: [null, Validators.required],
      quantity: [null, Validators.required],
      noOfDays: [null, Validators.required],
      isMorning: [null, Validators.required],
      isAfternoon: [null, Validators.required],
      isEvening: [null, Validators.required],
      isNight: [null, Validators.required],
      status: 'ACTIVE',

    });
  }
  imageGet: any = [];
  imagearr: any = [];
  doctorData = {}
  addDoctor(doctorData: any) {
    const doctorGroup = this.fb.group({
      patientId: [doctorData.patientId],
      patientName: [doctorData.patientName],
      imageId: [doctorData.patientImage.imageId],
      patientImage: [doctorData.patientImage.patientImage],
    });
    this.doctorArray.push(doctorGroup);
  }

  get doctorArray(): FormArray {
    return this.myForm.get('doctorArray') as FormArray;
  }
  getId: any = []
  imageArr: any = []
  // patchFormWithPrescriptionData:any
  getPrescriptionById() {
    this.spinner.show();
    // if (this.addPresId) {
    //   this.service.GetFormid(this.addPresId).subscribe(
    //     (res) => {
    //       if (res) {
    //         this.edit = res.data;
    //         this.patchFormWithPrescriptionData(this.edit);

    //       } else {
    //         console.error('Prescription data not found.');
    //       }
    //     },
    //     (error) => {
    //       console.error('Error fetching prescription data:', error);
    //     }
    //   );
    // }
    this.service.GetFormid(this.presid).subscribe(res => {
      this.patientInfo = res.data.patient;

      this.getId = res.data.prescriptionDetails
      if (this.patientInfo.patientImage != null) {
        const doctorData = {
          // patientImage: atob(this.patientInfo.patientImage)
          patientId: this.patientInfo?.patientImage?.patientId,
          patientName: this.patientInfo?.patientImage?.patientName,
          patientImage: atob(this.patientInfo?.patientImage?.patientImage)
        };

        this.patientInfo.doctorData = doctorData;
      }
      this.imageArr.push(this.patientInfo);


      // console.log(this.patientInfo);

      this.editPrescription.patchValue({
        prescriptionName: res.data.prescriptionName
        // status: 'ACTIVE',

      })
      let prescription = this.editPrescription.get('prescription') as FormArray;
      prescription.controls = [];
      res.data.prescriptionDetails.forEach((x: any) => {
        prescription.push(this.createPresFormGroup());
      })

      res.data.prescriptionDetails.forEach((data: any, index: any) => {
        prescription.at(index).patchValue({
          // id: data.prescriptionNameid,
          medicineName: data.medicineName,
          quantity: data.quantity,
          noOfDays: data.noOfDays,
          isMorning: data.isMorning,
          isAfternoon: data.isAfternoon,
          isEvening: data.isEvening,
          isNight: data.isNight,
          status: 'ACTIVE',  // Assuming a default value
        })
      })
    })
    this.spinner.hide();
  }

  //   patchFormWithPrescriptionData(prescriptionData: any) {

  //     if (prescriptionData) {
  //       this.editPrescription.patchValue({
  //         id: prescriptionData.prescriptionid,       
  //         prescriptionName: prescriptionData.prescriptionName,
  //         prescription: this.patchPrescriptions(prescriptionData.prescriptionNameDto),      

  //       });

  //     } else {
  //       console.error('Prescription data not found.');
  //     }

  // }
  // patchPrescriptions( data :any){
  //   if(data.length==0){
  //     this.editAddprescription();
  //   }
  //   else{
  //   let prescription = this.editPrescription.get('prescription') as FormArray;
  //   prescription.controls = [];
  //  data.forEach((x:any)=>{
  //     prescription.push(this.createPresFormGroup());
  //   })

  //  data.forEach((data:any,index:any)=>{
  //     prescription.at(index).patchValue({
  //       // id: data.prescriptionNameid,
  //       medicineName: data.medicineName,
  //       quantity: data.quantity,
  //       noOfDays: data.noOfDays,
  //       isMorning:[null, Validators.required],
  //       isAfternoon:[null, Validators.required],
  //       isEvening:[null, Validators.required],
  //       isNight:[null, Validators.required],
  //       status: 'ACTIVE',  // Assuming a default value
  //     })
  //   })
  // }
  // }
  // patchTimeObjects(timeObjects: any) {
  //   const timeObject = this.prescription.at(0).get('timeObj') as FormArray; // Assuming you want to patch the time for the first prescription item
  //   console.log(timeObject)
  //   timeObjects.forEach((timeObj: any) => {
  //     timeObject.push(this.fb.group({
  //       prescriptionTime: timeObj.prescriptionTime,
  //       prescriptionTimeId:timeObj.prescriptionTimeId,
  //       prescriptionNameId:timeObj.prescriptionNameId
  //     }));
  //   });
  // }

  // myPatientInfo() {
  //   this.AppointmentService.getPatient(this.addPresId).subscribe(res => {
  //     this.patientInfo = res.data;
  //     this.patient = this.patientInfo.patientId;

  //   })
  //   console.log(this.patient);
  // }
  acceptArr: any = [];
  appointmentid: any
  appointmentsGet() {
    this.appointmentsService.appGet().subscribe((res: any) => {
      this.value = res.data
      // this.acceptArr = this.value.filter((item: any) => item.patientId == this.patient);
      // this.appointmentid = this.acceptArr[0].appointmentId;

    })
    console.log(this.appointmentid);

  }
  getDoctorinfo() {
    this.DashBoardService.getDoctorid().subscribe(res => {
      this.values = res.data
    })
  }
  doctorId: any;
  getUpdate() {
    this.submitted = true;
    if (this.editPrescription.invalid) {
      return
    }
    let obj = this.editPrescription.value;
    obj.patientId = this.patient;
    obj.doctorId = this.doctorId;
    obj.appointmentId = this.appointmentid;
    obj.prescription.forEach((x: any) => {
    })
    this.service.updateForm(this.editPrescription.value).subscribe(res => {
      console.log(res);
      this.route.navigate(['doctors/patientsprofile'])

    })
  }
}

