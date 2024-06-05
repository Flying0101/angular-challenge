import { Component } from '@angular/core'
import { TextFitComponent } from '../text-fit/text-fit.component'
import { InputComponent } from '../input/input.component'

@Component({
  selector: 'app-timer-overview',
  templateUrl: './timer-overview.component.html',
  styleUrl: './timer-overview.component.scss',
  imports: [TextFitComponent, InputComponent],
  standalone: true,
})
export class TimerOverviewComponent {
  inputTitle: string = localStorage.getItem('inputTitle') || ''
  countdown: string = localStorage.getItem('countdown') || ''
  intervalId?: number

  ngOnInit() {
    this.inputTitle = localStorage.getItem('inputTitle') || ''
    this.onDateInputChange(localStorage.getItem('endDate') || '')
  }

  onInputEventTitleChange(newTitle: string): void {
    this.inputTitle = newTitle
    localStorage.setItem('inputTitle', newTitle)
  }
  onDateInputChange(newDate: string): void {
    localStorage.setItem('endDate', newDate)

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(newDate)) {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      this.countdown = '0d 0h 0m 0s'
      localStorage.setItem('countdown', this.countdown)
      return
    }

    const dateParts = newDate.split('-').map(part => parseInt(part, 10))
    const endDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])

    if (isNaN(endDate.getTime()) || dateParts[2] > 31 || dateParts[1] > 12) {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      this.countdown = '0d 0h 0m 0s'
      localStorage.setItem('countdown', this.countdown)
      return
    }

    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    this.intervalId = window.setInterval(() => {
      const todayDate = new Date()
      const distance = endDate.getTime() - todayDate.getTime()

      if (distance < 0) {
        clearInterval(this.intervalId)
        this.countdown = '0d 0h 0m 0s'
        return
      }

      const MILLISECONDS_PER_SECOND = 1000
      const SECONDS_PER_MINUTE = 60
      const MINUTES_PER_HOUR = 60
      const HOURS_PER_DAY = 24

      const days = Math.floor(
        distance /
          (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY),
      )
      const hours = Math.floor(
        (distance %
          (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY)) /
          (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR),
      )
      const minutes = Math.floor(
        (distance % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR)) /
          (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE),
      )
      const seconds = Math.floor(
        (distance % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE)) / MILLISECONDS_PER_SECOND,
      )

      this.countdown = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`
      localStorage.setItem('countdown', this.countdown)
    }, 1000)
  }
}
