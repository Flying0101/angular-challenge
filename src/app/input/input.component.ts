import { Component, EventEmitter, Output } from '@angular/core'

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

  onDateInputChange(event: Event): void {
    const target = event.target as HTMLInputElement
    this.dateInput = target.value
    this.dateInputChange.emit(this.dateInput)
  }
}
