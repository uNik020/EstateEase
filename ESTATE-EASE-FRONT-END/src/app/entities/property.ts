import { Location } from './location';
export class Property {
    propertyId: number;
    propertyType: string;
    propertyStatus:string;
    price: number;
    location: {
        city: string;
        state: string;
        country: string;
        pin: string;
    };
    area: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    propertyImgPath: string;
    owner:number;

    constructor(
        propertyId: number,
        propertyType: string,
        price: number,
        location: Location,
        area: number,
        description: string,
        propertyImgPath: string,
        bedrooms: number,
        bathrooms: number,
        propertyStatus:string,
        owner:number
    ) {
    this.propertyId = propertyId;
    this.price = price;
    this.propertyType = propertyType;
    this.propertyStatus = propertyStatus;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.area = area;
    this.location=location;
    this.propertyImgPath=propertyImgPath;
    this.description = description;
    this.owner = owner;
    }  
}
  