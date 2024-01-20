import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  standalone: true,
  imports: [],
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.scss',
  host: {
    class: 'w-fit relative',
  },
})
export class DropDownMenuComponent {
  @Input() options!: string[];
  @Output() onOptionChange = new EventEmitter<number>();
  selectedOption: string = '';
  @ViewChild('dropDown') dropDown!: ElementRef<HTMLElement>;

  ngAfterContentInit() {
    this.selectedOption = this.options[0];
  }

  openDropDown() {
    this.dropDown.nativeElement.classList.remove('hidden');
  }

  onSelectOption(index: number) {
    if (this.selectedOption !== this.options[index]) {
      this.onOptionChange.emit(index);
    }
    this.selectedOption = this.options[index];
    this.dropDown.nativeElement.classList.add('hidden');
  }
}
