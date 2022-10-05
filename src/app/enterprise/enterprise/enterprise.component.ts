import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor() { }

  ngOnInit(): void {
  }

}
