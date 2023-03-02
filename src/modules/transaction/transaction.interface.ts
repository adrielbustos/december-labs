export interface IPostTransaction {
    accountFrom:string;
    accountTo:string;
    description:string;
    amount:number;
    date:Date;
    commission:number;
}

export interface IGetTransactions {
    from?:Date;
    to?:Date;
    sourceAccountID?:string;
}