
export interface Program {
    slug: string,
    title: string,
    description: string,
    dateRange: string,
    timeRange: string,
    location: string,
    who: string,
    cap: number,
    level: string,
    cost: string,
    paymentInstructions: string,
}

export interface Coach {
    name: string,
    description: string,
}
