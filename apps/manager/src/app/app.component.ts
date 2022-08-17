import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@basic-cms/api-interfaces';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'basic-cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}
  ngOnInit() {
    this.keycloakService.isLoggedIn().then((logged) => {
      if (logged) {
        this.keycloakService.getToken().then(result => {
          console.log(result)
        });
      } else {
        this.keycloakService.login().then(() => {

        })
      }
    })
  }
}
