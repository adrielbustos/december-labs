export default interface ITransaction {
    origin:string;
    destination:string;
    description:string;
    amount:number;
    // conversion:string;
    // status:string;
    date:Date;
    commission:number;
}