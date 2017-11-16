export class UserModel {

    public Firstname: string;
    public Lastname: string;
    public Email: string;
    public Password: string;
    public PhoneNumber: string;
    public Birthdate: Date;
    public AvatarFileName: string;
    public AvatarContent: string;
    public Status: boolean;

    updateModel(name: string, 
                lastname: string, 
                email: string, 
                password: string, 
                phoneNumber: string, 
                birthdate: Date, 
                avatarFileName: string, 
                avatarContent: string,
                status: boolean) {
        this.Firstname = name;
        this.Lastname = lastname;
        this.Email = email;
        this.Password = password;
        this.PhoneNumber = phoneNumber;
        this.Birthdate = birthdate;
        this.AvatarContent = avatarContent;
        this.AvatarFileName = avatarFileName;
        this.Status = status;
    }

}