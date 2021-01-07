import {Component} from '@angular/core';
import {SpeakersService} from "../../../core/services/speakers.service";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    response = '';

    constructor(
        private speakerService: SpeakersService
    ) {
    }

    getInfo() {
        this.speakerService.getSpeakers().subscribe(value => {
            console.log(value);
            this.response = value;
            localStorage.setItem('Speakers-correct', JSON.stringify(value));
        }, error => {
            console.log(error);
            alert(JSON.stringify(error));
            localStorage.setItem('Speakers-error', JSON.stringify(error));
        })
    }


}
