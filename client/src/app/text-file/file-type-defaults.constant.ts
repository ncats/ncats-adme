export const fileTypeDefaults = {
    csv: {
        lineBreak: '\n',
        columnSeparator: ',',
        hasHeaderRow: true,
        indexIdentifierColumn: 0
    },
    text: {
        lineBreak: '\n',
        columnSeparator: '\t',
        hasHeaderRow: true,
        indexIdentifierColumn: 0
    },
    smi: {
        lineBreak: '\n',
        columnSeparator: '\t',
        hasHeaderRow: false,
        indexIdentifierColumn: 0
    }
};
