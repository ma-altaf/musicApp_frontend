import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SongService } from '../../services/song/song.service';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './song-form.component.html',
  styleUrl: './song-form.component.scss',
  host: {
    class: 'flex w-4/5 h-full',
  },
})
export class SongFormComponent {
  private songService: SongService = inject(SongService);
  private router: Router = inject(Router);
  @ViewChild('imageInput') imgFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('audioInput') audioFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;
  showError: boolean = false;

  songForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    audio: new FormControl(null, [Validators.required]),
  });

  constructor() {}

  get id() {
    return this.songForm.get('id');
  }

  get title() {
    return this.songForm.get('title');
  }

  get image() {
    return this.songForm.get('image');
  }

  get audio() {
    return this.songForm.get('audio');
  }

  imageFileInputClick() {
    this.imgFileInput.nativeElement.click();
  }

  onImgPick(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files?.length != 0) {
      this.songForm.patchValue({ image: files[0] });
      let fileImage = new FileReader();
      fileImage.onload = () => {
        if (fileImage.result) {
          this.imageRef.nativeElement.src = fileImage.result?.toString();
        }
      };
      fileImage.readAsDataURL(files[0]);
    }
  }

  audioFileInputClick() {
    this.audioFileInput.nativeElement.click();
  }

  onAudioPick(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files?.length != 0) {
      this.songForm.patchValue({ audio: files[0] });
      this.title?.setValue(
        files[0].name.substring(0, files[0].name.lastIndexOf('.'))
      );
    }
  }

  uploadSong() {
    if (this.audio?.value == null || this.image?.value == null) {
      this.showError = true;
      return;
    }

    if (this.songForm.valid) {
      let formData = new FormData();
      formData.append('title', this.title?.value);
      formData.append('image', this.image?.value);
      formData.append('audio', this.audio?.value);

      this.songService.addSong(formData).subscribe(() => {
        this.router.navigateByUrl('/channel');
      });
    }
  }
}
