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
            this.users.map(res => {
                if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {           
                resolve(data);
            },
            err => {
                reject(err);
            });
        });
    }

    getUsers(): Promise<Array<UserModel>> {
        return new Promise((resolve, reject) => {
            this.users = this.http.get(this.apiEndpoint + '/users');
            this.users.map(res => {
                if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {
                debugger;
                resolve(data);
            },
            err => {
                reject(err);
            });
        });
    }

    addUser(model: UserModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.users = this.http.post(this.apiEndpoint + '/users', model);
                this.users.map(res => {
                    if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {
                resolve(true);
            },
            err => {
                reject(err);
            });
        });
    }

    updateUser(id: string, model: UserModel): Promise<boolean>  {
        return new Promise((resolve, reject) => {
            this.users = this.http.put(this.apiEndpoint + '/users/' + id, model);
            this.users.map(res => {
                if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {
                resolve(true);
            },
            err => {
                reject(err);
            });
        });
    }

    removeUser(id: string): Promise<boolean>  {
        return new Promise((resolve, reject) => {
            this.users = this.http.delete(this.apiEndpoint + '/users/' + id);
            this.users.map(res => {
                if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {
                resolve(true);
            },
            err => {
                reject(err);
            });
        });
    }

}