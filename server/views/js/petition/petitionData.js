let date_year = parseInt(new Date().toISOString().slice(0, 4)) + 543 + ""
let year_insert = date_year.slice(2, 4)
let name_user = ''
let list_image = []
let p_data = {
    id: '',
    year: year_insert,
    personal_id: '',
    request_id: '',
    request_year: '',
    date_submission: '',
    type: '',
    status: '',
    date_start: '',
    date_end: '',
    total_image: '',
    is_deleted: '',
    status_insert: 'NEW',
}
function resetP() {
    list_image = []
    name_user = ''
    p_data = {
        id: '',
        year: year_insert,
        personal_id: '',
        request_id: '',
        request_year: '',
        date_submission: '',
        type: '',
        status: '',
        date_start: '',
        date_end: '',
        total_image: '',
        is_deleted: '',
        status_insert: 'NEW'
    }
}