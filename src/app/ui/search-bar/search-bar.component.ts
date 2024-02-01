import { Component, inject } from '@angular/core';
import { SongService } from '../../services/song/song.service';
import { Song } from '../../services/models/song';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  host: {
    class: 'w-4/5 h-full',
  },
})
export class SearchBarComponent {
  private songService: SongService = inject(SongService);
  isSearching: boolean = false;
  debouceEvent: any | null = null;
  searchResult: Song[] | null = null;

  toggleSearch(state: boolean) {
    this.isSearching = state;
  }

  debounceSearchSong(event: any) {
    clearTimeout(this.debouceEvent);
    this.debouceEvent = setTimeout(() => {
      this.searchSong(event);
    }, 300);
  }

  searchSong(event: any) {
    const query = event.target.value;
    if (query) {
      this.songService.searchSongs(query).subscribe((res) => {
        this.searchResult = res;
      });
    } else {
      this.searchResult = null;
    }
  }

  goToSongPage(song: Song) {
    // TODO: route to song page
    console.log('route to song page');
  }
}
