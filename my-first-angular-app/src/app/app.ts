import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from './housing-location/housing-location';
import { HousingLocation } from './housing-location';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // 1. Our complete list of cards
  readonly housingLocationList = signal<HousingLocation[]>([
    { id: 0, name: 'Acme Fresh Start Housing', city: 'Chicago', state: 'IL', photo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=400' },
    { id: 1, name: 'A113 Transitional Housing', city: 'Santa Monica', state: 'CA', photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400' },
    { id: 2, name: 'Warm Beds Housing Support', city: 'Juneau', state: 'AK', photo: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Homesteady Housing', city: 'Chicago', state: 'IL', photo: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Happy Homes Group', city: 'Gary', state: 'IN', photo: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Hopeful Apartment Group', city: 'Oakland', state: 'CA', photo: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=400' },
    { id: 6, name: 'Seriously Safe Towns', city: 'Oakland', state: 'CA', photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400' },
    { id: 7, name: 'Capital Safe Towns', city: 'Portland', state: 'OR', photo: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=400' }
  ]);

  // 2. Signal for the search text
  filterText = signal('');

  // 3. Computed signal: This automatically updates when the list or text changes
  filteredLocationList = computed(() => {
    if (!this.filterText()) return this.housingLocationList();

    return this.housingLocationList().filter(location =>
      location.city.toLowerCase().includes(this.filterText().toLowerCase())
    );
  });

  // Function linked to the search button
  updateFilter(text: string) {
    this.filterText.set(text);
  }
}
