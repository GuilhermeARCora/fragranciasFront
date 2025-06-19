import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-search',
  imports: [MatIconModule, MatFormField, MatAutocompleteModule, MatLabel, ReactiveFormsModule, MatInput,AsyncPipe, CommonModule, MatRippleModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit{

  isMenuOpen = signal(false);
  menuVisible = signal(false);
  menuClass = signal<'slide-in' | 'slide-out'>('slide-in');
  showSearchInput = signal(false);
  cdr = inject(ChangeDetectorRef);

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'arroz'];
  filteredOptions!: Observable<string[]>;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  };

    openMenu() {
      this.menuClass.set('slide-in');
      this.menuVisible.set(true);
    };

    closeMenu() {
      this.menuClass.set('slide-out');
      setTimeout(() => this.menuVisible.set(false), 300);
    };

    toogleOpenAnimation(){
      this.showSearchInput.update(value => !value);

        setTimeout(() => {
            this.cdr.detectChanges();
            this.searchInput?.nativeElement.focus();
        }, 100);
    };

    submit(){
      console.log('value', this.myControl.value);
    };


};
