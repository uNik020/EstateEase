export class Email{
	setTo:string;
    setSubject:string;
    setText:string;

    constructor(setTo:string,setSubject:string,setText:string
    ){
        this.setTo = setTo;
        this.setSubject=setSubject;
        this.setText =setText;
    }

}