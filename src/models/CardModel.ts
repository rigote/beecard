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
    public IdentityBgColor: string;
    public IdentityFontColor: string;

    constructor(){
        this.SocialMedias = new Array<CardSocialMedia>();
    }
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