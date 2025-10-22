import { Component, EventEmitter, OnInit } from '@angular/core';
const noop = () => { };
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  tags: Array<string> = [];
  tagss: any = [];
  removeLastOnBackspace: boolean = false;
  canDeleteTags: boolean = true;
  onMaxTagsReached: EventEmitter<void> = new EventEmitter();
  private onChangeCallback: (_: any) => void = noop;
  maxTags: any;
  ishidden: boolean = false;
  public educationalArray: any = [1];
  public experienceArray: any = [1];
  public awardsArray: any = [1];
  public membershipArray: any = [1];
  public registrationArray: any = [1];
  constructor() { }

  ngOnInit(): void {
  }
  services = ['Tooth Cleaning'];
  specialization = ['Child Care', 'Dental Care'];
  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onTagsChanged(event: any) {
    console.log(event);

  }
  removeLastTag(tagInput: HTMLInputElement): void {
    if (!this.removeLastOnBackspace || !this.tags.length) {
      return;
    }

    if (tagInput.value === '') {
      this.removeTag(this.tags[this.tags.length - 1]);
    }
  }
  removeTag(tagToRemove: any): void {
    if (!this.isDeleteable(tagToRemove)) {
      return;
    }
    this.tags = this.tags.filter((tag: any) => tagToRemove !== tag);
    this.tagsChanged('remove', tagToRemove);
  }
  isDeleteable(tag: any) {
    if (typeof tag.deleteable !== "undefined" && !tag.deleteable) {
      return false;
    }
    return this.canDeleteTags;
  }
  private tagsChanged(type: string, tag: any): void {
    this.onChangeCallback(this.tags);
    // this.onTagsChanged.emit({
    //     change: type,
    //     tag: tag
    // });
    if (this.maximumOfTagsReached()) {
      this.onMaxTagsReached.emit();
    }
  }
  maximumOfTagsReached(): boolean {
    return typeof this.maxTags !== 'undefined' && this.tags && this.tags.length >= this.maxTags;
  }
  public addEducation(): void {
    this.educationalArray.push(1)
  }
  public deleteEducation(index: any): void {
    this.educationalArray.splice(index, 1)
  }
  public addExperience(): void {
    this.experienceArray.push(1)
  }
  public deleteExperience(index: any): void {
    this.experienceArray.splice(index, 1)
  }
  public addAwards(): void {
    this.awardsArray.push(1)
  }
  public deleteAwards(index: any): void {
    this.awardsArray.splice(index, 1)
  }
  public addMemberships(): void {
    this.membershipArray.push(1)
  }
  public deleteMemberships(index: any): void {
    this.membershipArray.splice(index, 1)
  }
  public addRegistrations(): void {
    this.registrationArray.push(1)
  }
  public deleteRegistrations(index: any): void {
    this.registrationArray.splice(index, 1)
  }
  pricingOption(event: any) {
    let pricetype = event.target['value']
    if (pricetype == 'price_free') {
      this.ishidden = false
    }
    else (
      this.ishidden = true
    )
  }
}
