import { Injectable } from '@angular/core';
import { ENV } from '@environment';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserModel } from '../models/UserModel';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RemoteService {

    private users: Observable<any>;

    constructor (private http: Http) {
    }

    private apiEndpoint: string = ENV.API_ENDPOINT;
        
    getUser(id: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {            
            this.users = this.http.get(this.apiEndpoint + '/users/' + id);
            this.users.map(res => res.json()).subscribe(data => {                
                debugger;                
                resolve(data);
            });
        });
    }

    getUsers(): Promise<Array<UserModel>> {
        return new Promise((resolve, reject) => {
            this.users = this.http.get(this.apiEndpoint + '/users');
            this.users.map(res => res.json()).subscribe(data => {
                debugger;
                resolve(data);
            });
        });
    }

    addUser(model: UserModel) {
        this.users = this.http.post(this.apiEndpoint + '/users', model);
        this.users.map(res => res.json()).subscribe(data => {
            debugger;
        });
    }

    updateUser(id: string, model: UserModel) {
        this.users = this.http.put(this.apiEndpoint + '/users/' + id, model);
        this.users.map(res => res.json()).subscribe(data => {
            debugger;
        });
    }

    removeUser(id: string) {
        this.users = this.http.delete(this.apiEndpoint + '/users/' + id);
        this.users.map(res => res.json()).subscribe(data => {
            debugger;
        });
    }

}