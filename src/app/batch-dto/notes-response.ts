export interface notesData{
    notes_id?: string;
    name?: string;
    category_id?: string;
    hyperlink?: string;
}

export interface inputNotesData{
    name?: string;
    category_id?: string;
    hyperlink?: string;
}

export interface notesGroupData{
    notes_per_category_list: notesGrouped[];
}

export interface notesGrouped{
    category_id?: string;
    category_name?: string;
    list_notes: notesData[];
}
