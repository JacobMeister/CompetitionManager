import { Component, OnInit, Input } from '@angular/core';
import { PouleInfo } from '../viewmodels/PouleInfo';

@Component({
  selector: 'app-statusdisplay-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss']
})
export class PouleComponent implements OnInit {
  @Input() poules: PouleInfo[];

  constructor() {}

  ngOnInit() {}
}
