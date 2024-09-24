export class Location {
    city: string;
    state: string;
    country: string;
    pin: string;

    constructor(
        city: string,
        state: string,
        country: string,
        pin: string,
    ){
        this.city=city;
        this.state=state;
        this.pin=pin;
        this.country=country;
    }
}