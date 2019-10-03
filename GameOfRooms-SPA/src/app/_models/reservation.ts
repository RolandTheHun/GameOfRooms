export interface Reservation {
    id: number;
    from: Date;
    until: Date;
    roomId: number;
    userId: number;
    summary: string;
    ownMachine: boolean;
    title: string;
}