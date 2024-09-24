export class Contact{
   
    contact_id : number;
	contact_name : string;
	contact_email : string;
	message : string;
	isActive : boolean;


    constructor(contact_id : number,contact_name : string,contact_email : string,message : string,isActive : boolean){
        this.contact_id = contact_id;
		this.contact_name = contact_name;
		this.contact_email = contact_email;
		this.message = message;
		this.isActive = isActive;
    }

}