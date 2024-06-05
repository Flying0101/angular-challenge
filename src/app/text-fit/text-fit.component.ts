import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  DoCheck,
  OnDestroy,
} from '@angular/core'

@Component({
  selector: 'app-text-fit',
  templateUrl: './text-fit.component.html',
  styleUrls: ['./text-fit.component.scss'],
  standalone: true,
})
export class TextFitComponent implements AfterViewInit, DoCheck, OnDestroy {
  @ViewChild('eventTitle') eventTitle!: ElementRef
  @ViewChild('dateTitle') dateTitle!: ElementRef

  @Input() inputTitle: string = ''
  @Input() countdown: string = ''

  FONT_SIZE_DECREMENT = 1;

  private previousInputTitle: string = ''
  private previousCountdown: string = ''
  private resizeObserver: ResizeObserver

  constructor() {
    this.resizeObserver = new ResizeObserver(() => {
      this.adjustFontSize(this.eventTitle.nativeElement)
      this.adjustFontSize(this.dateTitle.nativeElement)
    })
  }

  ngAfterViewInit() {
    this.resizeObserver.observe(this.eventTitle.nativeElement.parentElement)
    this.resizeObserver.observe(this.dateTitle.nativeElement.parentElement)
  }

  ngDoCheck() {
    if (this.inputTitle !== this.previousInputTitle || this.countdown !== this.previousCountdown) {
      this.previousInputTitle = this.inputTitle
      this.previousCountdown = this.countdown
      this.adjustFontSize(this.eventTitle.nativeElement)
      this.adjustFontSize(this.dateTitle.nativeElement)
    }
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect()
  }

  adjustFontSize(element: HTMLElement) {
    while (element.scrollWidth > element.offsetWidth) {
      const fontSize = parseFloat(
        window.getComputedStyle(element, null).getPropertyValue('font-size'),
      )
      element.style.fontSize = fontSize - this.FONT_SIZE_DECREMENT + 'px'
    }
  }
}
