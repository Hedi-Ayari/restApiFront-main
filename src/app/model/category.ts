enum Status {
    published = 'published',
    draft = 'draft',
    waiting = 'waiting'
}

export interface Category {
    id_category: number;
    name: string;
    status: Status;
    date_created: Date;
}

