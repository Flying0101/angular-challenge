import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
})
export class InputComponent {
  inputEventTitle = ''
  @Output() inputEventTitleChange = new EventEmitter<string>()

  onInputEventTitleChange(event: Event): void {
    const target = event.target as HTMLInputElement
    this.inputEventTitle = target.value
    this.inputEventTitleChange.emit(this.inputEventTitle)
  }

  dateInput = ''
  @Output() dateInputChange = new EventEmitter<string>()

  @ViewChild('dateInputField') dateInputField!: ElementRef

  onDateInputChange(event: Event): void {
    const target = event.target as HTMLInputElement
    let inputValue = target.value

    if (this.dateInput.length > inputValue.length) {
      this.dateInput = inputValue
      this.dateInputChange.emit(this.dateInput)
      this.dateInputField.nativeElement.value = this.dateInput
      return
    }

    if (inputValue.length === 4 || inputValue.length === 7) {
      inputValue += '-'
    }

    this.dateInput = inputValue
    this.dateInputChange.emit(this.dateInput)
    this.dateInputField.nativeElement.value = this.dateInput
  }
}
