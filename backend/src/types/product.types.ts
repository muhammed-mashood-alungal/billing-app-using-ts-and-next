
export default interface productData {
    id:number;
    code:string;
    name : string;
    category:string;
    size : string;
    color : string;
    price:number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}