export interface ClientModel {
    _id: string; // MongoDB ObjectId as a string
    firstName: string;
    lastName: string;
    phone: number;
    age?: number; // Optional property
    address?: string; // Optional property
    cars: string[]; // Array of Car ObjectIds as strings
}
