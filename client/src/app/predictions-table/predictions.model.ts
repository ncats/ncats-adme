export interface PredictionsData {
    hasErrors: boolean;
    errorMessages: Array<string>;
    columns: Array<string>;
    mainColumnsDict: { [columnName: string]: PredictionsColumnsDict };
    data: Array<any>;
}

export interface PredictionsColumnsDict {
    order: number;
    description: string;
    isSmilesColumn: boolean;
}

export interface DownloadEvent {
    data: Array<any>;
    allColumns: Array<string>;
}
