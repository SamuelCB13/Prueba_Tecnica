import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.css']
})

export class FilmsComponent implements OnInit {
    jsonData: any[] = [];
    selectedFilms: any | null = null;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get('./assets/sample.json').subscribe((data: any) => {
            const filteredResults = data.entries
                .filter((entry: any) => entry.releaseYear >= 2010 && entry.programType === 'movie')
                .sort((a: any, b: any) => a.title.localeCompare(b.title));

            this.jsonData = filteredResults.slice(0, 20);
        });
    }

    onMouseOver(index: number) {
        document.getElementsByClassName('result-box')[index].classList.add('hovered');
    }

    onMouseOut(index: number) {
        document.getElementsByClassName('result-box')[index].classList.remove('hovered');
    }

    openPopup(movie: any) {
        this.selectedFilms = movie;
    }
    closePopup() {
        this.selectedFilms = null;
    }
}