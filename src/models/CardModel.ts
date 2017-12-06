import { CardTitle } from "ionic-angular/components/card/card-title";
import { link } from "fs";

export class CardModel{
    public AvatarImage: string;    
    public FullName: string;
    public Type: CardType;
    public Occupation: string;
    public Phone: string;
    public Cellphone: string;
    public Email: string;
    public Website: string;
    public SocialMedias: Array<CardSocialMedia>;
    public CompanyLogo: string;
    public CompanyName: string;
    public IsFavorite: boolean;
    public Config: CardConfig;
    public Address: string;
    public Address2: string;
    public PostalCode: string;
    public City: string;
    public Neighborhood: string;

    constructor(){
        this.SocialMedias = new Array<CardSocialMedia>();
    }

    updateModel(avatarImage: string,
                fullName: string,                 
                type: CardType,
                occupation: string,
                phone: string,
                cellphone: string,
                email: string,
                website: string,
                facebook: string,
                twitter: string,
                linkedin: string,
                instagram: string,
                companyLogo: string,
                companyName: string,
                address: string,
                address2: string,
                postalCode: string,
                city: string,
                neighborhood: string) {
        this.AvatarImage = avatarImage;
        this.FullName = fullName;
        this.Type = type,
        this.Occupation = occupation;
        this.Phone = phone;
        this.Cellphone = cellphone;
        this.Email = email;
        this.Website = website;
        
        if (facebook != null && facebook.length > 0) {
            let fbMedia = new CardSocialMedia();
            fbMedia.Type =  SocialMediaType.Facebook;
            fbMedia.Url = facebook;

            this.SocialMedias.push(fbMedia);
        }

        if (twitter != null && twitter.length > 0) {
            let ttMedia = new CardSocialMedia();
            ttMedia.Type =  SocialMediaType.Twitter;
            ttMedia.Url = twitter;
            
            this.SocialMedias.push(ttMedia);
        }

        if (linkedin != null && linkedin.length > 0) {
            let lkMedia = new CardSocialMedia();
            lkMedia.Type =  SocialMediaType.Linkedin;
            lkMedia.Url = linkedin;
            
            this.SocialMedias.push(lkMedia);
        }

        if (instagram != null && instagram.length > 0) {
            let inMedia = new CardSocialMedia();
            inMedia.Type =  SocialMediaType.Instagram;
            inMedia.Url = instagram;
            
            this.SocialMedias.push(inMedia);
        }

        this.CompanyLogo = companyLogo;
        this.CompanyName = companyName;
        this.Address = address;
        this.Address2 = address2;
        this.PostalCode = postalCode;
        this.City = city;
        this.Neighborhood = neighborhood;
    }
}

export class CardConfig{
    public BgColor: string;
    public FontColor: string;
}

export class CardSocialMedia{
    public Type: SocialMediaType;
    public Url: string;
}

export enum CardType{
    Personal = 0,
    Company = 1
}

export enum SocialMediaType{
    Facebook = 0,
    Linkedin = 1,
    Twitter = 2,
    Instagram = 3
}