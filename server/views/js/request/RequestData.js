let filePdf = {
    name: '',
    data: ''
}
let requestData = {
    is_request_changed: false,
    no: '',
    year: parseInt(new Date().toISOString().slice(0, 4)) + 543,
    personal_id_owner: 'P000001',
    request_type_id: 1,
    staff_id_alderman: '',
    establishment_id: '',
    staff_id_money: '',
    reference_id: 'YES',
    train_id: 'YES',
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
    address_id: 'SAVE',
    perosonal_id: 'P000001',
    is_land_owned: 'NO',
    type: '',
    name: 'Aร้านไอติมอร่อยมาก',
    machine_size: 90,
    area_size: 500.55,
    worker: 100,
    phone: '-',
    fax: '',
    grond: ''
}
let addressEstablishmentData = {
    is_address_establishment_changed: true,
    id: "",
    home_number: '88/99',
    moo: '5',
    trxk: '55สถานประกอบการ',
    sxy: 'สถานประกอบการ',
    building: '',
    road: '',
    district_name: 'สอง',
    amphur_name: 'หนึ่ง',
    province_name: 'กรุงเทพ'
}
let addressOwnerLandData = {
    is_address_owner_changed: false,
    id: "",
    home_number: '147/292',
    moo: '3',
    trxk: 'เจ้าของที่ดิน',
    sxy: 'เจ้าของที่ดิน',
    building: 'เจ้าของที่ดิน',
    road: 'เจ้าของที่ดิน',
    district_name: 'สอง',
    amphur_name: 'หนึ่ง',
    province_name: 'กรุงเทพ'
}
let landData = {
    is_land_changed: false,
    id: "",
    address_id: "",
    title: 'นาย',
    name: 'ซี',
    surname: 'บี',
    birthday: "20-05-2563",
    phone: "-",
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
    id: "ADD0000001",
    home_number: "147/525",
    moo: '99',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
    district_name: "ห้วยกะปิ",
    amphur_name: "เมืองชลบุรี",
    province_name: "ชลบุรี"
};
let operatorData = {
    is_personal_changed: false,
    id: "P000001",
    address_id: "",
    title: "นางสาว",
    type: "บุคคลธรรมดา",
    name: "เขมนิจ",
    surname: "จามิกรณ์",
    nationality: 'ลาว',
    race: 'ไทย',
    birthday: '31-01-2546',
    personal_id: "1254233652124",
    card_issued: "04-02-2560",
    card_expipe: '',
    phone: "0616588521",
    fax: ''
};

let assistantOperatorData ={
    id : '',
    title : '',
    name : '',
    surname: '',
    personal_id: ''
}