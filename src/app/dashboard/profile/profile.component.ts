import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  
  constructor(
  
    private router: Router,
    private _activateRouter: ActivatedRoute,
  
  ) {
   
  }
ngOnInit(): void {
    
}

}
