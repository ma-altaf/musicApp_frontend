import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { Artist } from '../../services/models/artist';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-account-details-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './account-details-panel.component.html',
  styleUrl: './account-details-panel.component.scss',
})
export class AccountDetailsPanelComponent {
  @Input() user: Artist | null = null;
  @ViewChild('fileupload') fileUpload!: ElementRef<HTMLInputElement>;
  private auth: AuthenticationService = inject(AuthenticationService);

  initiateFileUpload() {
    this.fileUpload.nativeElement.click();
  }

  uploadProfileImg() {
    let formData = new FormData();
    let filelist: FileList | null = this.fileUpload.nativeElement?.files;
    if (filelist) {
      formData.append('imgFile', filelist[0]);
      this.auth.updateImg(formData).subscribe((res) => {
        console.log(res);
        if (this.user?.imgUrl) {
          this.user.imgUrl = res.imgUrl;
        }
      });
    }

    // await fetch('http://localhost:8080/photoz', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((result) => result.text())
    //   .then((text) => alert(text));
  }
}
