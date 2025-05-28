export function isSuccessRecord(record) {
    return record.status === 'success' && 'id' in record.details;
}
