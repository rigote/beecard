import { Injectable } from '@angular/core';
import { UserStorageModel } from '../models/StorageModel';
import { access } from 'fs';

@Injectable()
export class StorageService {

    clearStorageData(){
        localStorage.setItem('language', null);
        localStorage.setItem('access_token', null);
        localStorage.setItem('client_id', null);
    }

    getLanguage(): string{
        let language = localStorage.getItem('language');
        return language == 'null' ? null : language;
    }

    setLanguage(language: string){
        localStorage.setItem('language', language);
    }

    getUserData(): UserStorageModel{
        let accessToken = localStorage.getItem('access_token');
        let clientId = localStorage.getItem('client_id');

        return {
            AccessToken: accessToken == 'null' ? null : accessToken,
            ClientId: clientId == 'null' ? null : clientId
        };
    }

    setAccessToken(accessToken: string){
        localStorage.setItem('access_token', accessToken);
    }

    setClientId(clientId: string){
        localStorage.setItem('client_id', clientId);
    }

    setUserData(accessToken: string, clientId: string){
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('client_id', clientId);
    }
   
}