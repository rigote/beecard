import { Injectable } from '@angular/core';
import { ENV } from '@environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserModel } from '../models/UserModel';
import { CardModel } from '../models/CardModel';
import { AuthModel } from '../models/AuthModel';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RemoteService {


    private token: Observable<any>;
    private users: Observable<any>;
    private personalCards: Observable<any>;

    constructor (private http: Http) {
    }

    private apiEndpoint: string = ENV.API_ENDPOINT;
        
    ////////////////
    // Token Methods
    ////////////////

    generateToken(username: string, password: string): Promise<AuthModel> {
        return new Promise((resolve, reject) => {     
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            let options = new RequestOptions({ headers: headers });
            let body = "grant_type=password&username=" + username + "&password=" + password;
                   
            this.token = this.http.post(this.apiEndpoint + '/token', body, options);
            this.token.map(res => {
                if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {           
                let authData = new AuthModel();
                authData.Token = data.access_token;
                authData.ClientId = data.client_id;

                resolve(authData);
            },
            err => {
                reject(err);
            });
        });
    }

    validateToken(token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {    
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers });   
                 
            this.users = this.http.get(this.apiEndpoint + '/token/validate', options);
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

    /////////////// 
    // User Methods
    ///////////////

    getUser(token: string, id: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {    
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers }); 

            this.users = this.http.get(this.apiEndpoint + '/users/' + id, options);
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

    getUsers(token: string): Promise<Array<UserModel>> {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers }); 

            this.users = this.http.get(this.apiEndpoint + '/users', options);
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

    updateUser(token: string, id: string, model: UserModel): Promise<boolean>  {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers }); 

            this.users = this.http.put(this.apiEndpoint + '/users/' + id, model, options);
            this.users.map(res => {                
                if (res && res.status == 204) return res.json();
            }).subscribe(data => {
                resolve(true);
            },
            err => {
                reject(err);
            });
        });
    }

    removeUser(token: string, id: string): Promise<boolean>  {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers }); 

            this.users = this.http.delete(this.apiEndpoint + '/users/' + id, options);
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

    ///////////////
    // Card Methods
    ///////////////

    addPersonalCard(token: string, userId: string, model: CardModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers }); 

            this.personalCards = this.http.post(this.apiEndpoint + '/users/' + userId + '/cards', model, options);
            this.personalCards.map(res => {
                    if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {
                resolve(true);
            },
            err => {
                reject(err);
            });
        });
    }

    updatePersonalCard(token: string, userId: string, cardId: string, model: CardModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers }); 

            this.personalCards = this.http.put(this.apiEndpoint + '/users/' + userId + '/cards/' + cardId, model, options);
            this.personalCards.map(res => {
                    if (res && res.status == 204) return res.json();
            }).subscribe(data => {
                resolve(true);
            },
            err => {
                reject(err);
            });
        });
    }

    getPersonalCard(token: string, userId: string, cardId: string): Promise<CardModel> {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers }); 

            this.personalCards = this.http.get(this.apiEndpoint + '/users/' + userId + '/cards/' + cardId, options);
            this.personalCards.map(res => {
                if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {
                resolve(data);
            },
            err => {
                reject(err);
            });
        });
    }

    getPersonalCards(token: string, userId: string, page: number = 1, pageSize: number = 20): Promise<Array<CardModel>> {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            let options = new RequestOptions({ headers: headers }); 

            this.personalCards = this.http.get(this.apiEndpoint + '/users/' + userId + '/cards/?page=' + page + '&size=' + pageSize, options);
            this.personalCards.map(res => {
                if (res && res._body.length > 0) return res.json();
            }).subscribe(data => {
                resolve(data.Items);
            },
            err => {
                reject(err);
            });
        });
    }

}