export interface OrderItem {
    publicationId: number;
    quantity: number;
}

export class Order {
    id?: number;
    schoolId?: number;
    orderedPublications: OrderItem[];
    totalAmount?: number;
    notes?: string;
    
    constructor(
        schoolId: number, 
        orderedPublications: OrderItem[],
        totalAmount?: number,
        notes?: string
    ) {
        this.schoolId = schoolId;
        this.orderedPublications = orderedPublications;
        this.totalAmount = totalAmount;
        this.notes = notes;
    }
}