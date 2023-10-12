export interface Schedule {
    id: number | undefined, 
    label_id: number, 
    date_start:  Date, 
    date_end: Date,
    frequency: string,
    success: boolean, 
    target_ms: number, 
    frequency_value: number, 
    target_metric:string,
    historyRecords: HistoryRecords[], 
    target_value: number,
    current_ms: number
}


export interface HistoryRecords {
    date_start: Date, 
    date_end: Date, 
    achieved_val_ms: number, 
}

export interface ExtendedRecords extends HistoryRecords {
    id: number
}
