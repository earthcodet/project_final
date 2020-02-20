let filePdf = {
    name: '',
    data: ''
}
let requestData = {
    is_request_changed: false,
    no: '',
    year: parseInt(new Date().toISOString().slice(0, 4)) + 543,
    personal_id_owner: '',
    request_type_id: 1,
    staff_id_alderman: '',
    establishment_id: '',
    staff_id_money: '',
    reference_id: 'NO',
    train_id: 'NO',
    personal_id_assistant: '',
    staff_id_approve: '', 
    establishment_is_land_owned: '',
    establishment_address_id: '',
    image_is_changed: false,
    menu: '',
    date_submission: '',
    date_approve: '',
    doc_no1: 'N',
    doc_no2: 'N',
    doc_no3: 'Y',
    doc_no4: 'Y',
    doc_no5: 'Y',
    doc_no6: 'Y',
    subcategory: '',
    product_type: '',
    sell_start: '',
    sell_end: '',
    sell_allow: 'N',
    receipt_order: '',
    receipt_fine: 0,
    receipt_fee: 0,
    receipt_total: 0,
    //
    receipt_date: '',
    date_issued: '',
    date_expired: '',
    //
    condition_no_1: '',
    condition_no_2: '',
    condition_no_3: '',
    condition_no_4: '',
    image_name: '',
    total_image: 0,
    status: '',
    delete_logic: '',
    is_deleted: '',
    last_update: '20-05-2563',
    username: 'ADMIN'

}
let establishmentData = {
    is_establishment_changed: true,
    id: '',
    address_id: '',
    perosonal_id: '',
    is_land_owned: 'NO',
    type: '',
    name: '',
    machine_size: 0,
    area_size: 0,
    worker: 0,
    phone: '',
    fax: '',
    grond: ''
}
let addressEstablishmentData = {
    is_address_establishment_changed: true,
    id: "",
    home_number: '',
    moo: '',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
    district_name: '',
    amphur_name: '',
    province_name: ''
}
let addressOwnerLandData = {
    is_address_owner_changed: false,
    id: "",
    home_number: '',
    moo: '',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
    district_name: '',
    amphur_name: '',
    province_name: ''
}
let landData = {
    is_land_changed: false,
    id: "",
    address_id: "",
    title: '',
    name: '',
    surname: '',
    birthday: "",
    phone: "",
    status_upload_file:'',
}
let referecneData = {
    id: '',
    title: '',
    name: '',
    surname: '',
    status: '',
    phone: ''
}
let trianData = {
    id: '',
    issuse: '',
    date_exp: '',
    date_issued: ''
}
let operatorAddressData = {
    is_address_changed: false,
    id: "",
    home_number: "",
    moo: '',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
    district_name: "",
    amphur_name: "",
    province_name: ""
};
let operatorData = {
    is_personal_changed: false,
    id: "",
    address_id: "",
    title: "",
    type: "",
    name: "",
    surname: "",
    nationality: '',
    race: '',
    birthday: '',
    personal_id: "",
    card_issued: "",
    card_expipe: '',
    phone: "",
    fax: ''
};

let assistantOperatorData ={
    id : '',
    title : '',
    name : '',
    surname: '',
    personal_id: ''
}