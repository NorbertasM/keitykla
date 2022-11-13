import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public course: number | null = null
  public currencies: { label: string, value: string }[] = []
  public error = false
  public from: string | null = null
  public loading = false
  public optionsLoading = false
  public to: string | null = null

  private getCourse(from: string, to: string) {
    this.loading = true
    this.error = false
    this.courseService.getCourse(from, to)
    .subscribe({
      next: (val) => {
        this.course = Object.values(val.rates)[0]
        this.loading = false
        this.error = false
      },
      error: () => {
        this.loading = false
        this.error = true
      }
    })
  }

  private getOptions() {
    this.loading = true
    this.courseService.getCurrencies().subscribe({
      next: (val) => {
        this.currencies = Object.entries(val).map(([value, label]) => ({ label, value }))
        this.loading = false
        this.error = false
      },
      error: () => {
        this.loading = false
        this.error = true
      }
    })
  }

  constructor(private courseService: CourseService) {
    this.getOptions()
  }

  ngOnInit(): void {
  }

  public onClickRefresh() {
    if (this.from && this.to) {
      this.getCourse(this.from, this.to)
    }
  }

}
