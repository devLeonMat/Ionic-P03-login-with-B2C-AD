import {Component} from '@angular/core';
import {SpeakersService} from "../../../core/services/speakers.service";
import {SpeakersModel} from "../../../core/models/speakers.model";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    speakers: SpeakersModel = new SpeakersModel();
    isCorrect = false;

    constructor(
        private speakerService: SpeakersService
    ) {
    }

    getInfo() {
        this.speakerService.getSpeakers().subscribe(value => {
            console.log(value);
            this.speakers = value;
            this.isCorrect = true;
            localStorage.setItem('Speakers-correct', JSON.stringify(value));
        }, error => {
            console.log(error);
            alert(JSON.stringify(error));
            localStorage.setItem('Speakers-error', JSON.stringify(error));
        })
    }


}
