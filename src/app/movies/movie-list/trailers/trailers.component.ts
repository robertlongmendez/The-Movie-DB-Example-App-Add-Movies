import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss'],
})
export class TrailersComponent implements OnInit {
  @Input() trailer_key?: string;
  @Input() trailer_name?: string;

  // Install ng-bootstrap
  // Import NgbModal & DomSanitizer (https://angular.io/api/platform-browser/DomSanitizer)
  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  // We are going to sanitize the YouTube URL with the following function
  getSanitizedURL(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //We are going to open the Modal with this function
  open(content: any): any {
    this.modalService.open(content, { size: 'xl', centered: true });
  }
}
