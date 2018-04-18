export class UserModel {

    public Firstname: string;
    public Lastname: string;
    public Email: string;
    public Password: string;
    public PhoneNumber: string;
    public Birthdate: Date;
    public AvatarBase64: string;
    public AvatarExtension: string;
    public Status: boolean;

    updateModel(name: string, 
                lastname: string, 
                email: string, 
                password: string, 
                phoneNumber: string, 
                birthdate: Date, 
                avatarBase64: string, 
                avatarExtension: string,
                status: boolean) {
        this.Firstname = name;
        this.Lastname = lastname;
        this.Email = email;
        this.Password = password;
        this.PhoneNumber = phoneNumber;
        this.Birthdate = birthdate;
        this.AvatarBase64 = avatarBase64;
        this.AvatarExtension = avatarExtension;
        this.Status = status;
    }

}