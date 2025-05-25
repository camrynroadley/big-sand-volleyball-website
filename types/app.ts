
export interface Program {
    id: string,
    title: string,
    description: string,
    dateRange: string,
    timeRange: string,
    location: string,
    target: string,
    cap: number,
    level: string,
    cost: string,
    paymentInstructions: string,
}

export interface Coach {
    name: string,
    description: string,
}
