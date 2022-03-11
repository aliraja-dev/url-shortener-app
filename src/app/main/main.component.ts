import { Component } from '@angular/core';
import { UrlShortenService } from '../services/urlshorten.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent  {
  public shortenedUrl ='';
  public error ='';
  public wrongUrlFormat = false;
  public copied = false;

  constructor(private urlShortenService: UrlShortenService) {}

  public handleShortenButtonClick(url: string) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const validated = regex.test(url);

    if (validated) {
      this.wrongUrlFormat = false;
      this.error = '';
      this.urlShortenService.shortenUrl(url).subscribe(
        response => {
          this.shortenedUrl = response.link;
        },
        error => {
          this.error = error;
          this.shortenedUrl = '';
          this.wrongUrlFormat = false;
        }
      );
    } else {
      this.wrongUrlFormat = true;
      this.shortenedUrl = '';
      this.error = '';
    }
  }

  public handleCopyButtonClick() {
    const shortenedUrl = document.querySelector('#shortenedUrl');
    const helperElement = document.createElement('textarea');
    document.body.appendChild(helperElement);
    helperElement.value = shortenedUrl!.textContent || '';
    helperElement.select();
    document.execCommand('copy');
    document.body.removeChild(helperElement);
    this.copied = true;
  }

}
