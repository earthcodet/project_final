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
    doc_no3: 'N',
    doc_no4: 'N',
    doc_no5: 'N',
    doc_no6: 'N',
    subcategory: '',
    product_type: '',
    sell_start: '',
    sell_end: '',
    sell_allow: 'N',
    //Money Y1
    receipt_order: '',
    receipt_order_year: '',
    receipt_fine: 0,
    receipt_fee: 0,
    receipt_total: 0,
    receipt_date: '',
    //Money Y2
    receipt_order_year_2: '',
    receipt_order_year_year_2: '',
    receipt_fine_year_2: 0,
    receipt_fee_year_2: 0,
    receipt_total_year_2: 0,
    receipt_date_year_2: '',
    //Money Y3
    receipt_order_year_3: '',
    receipt_order_year_year_3: '',
    receipt_fine_year_3: 0,
    receipt_fee_year_3: 0,
    receipt_total_year_3: 0,
    receipt_date_year_3: '',
    //
    
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
    status_before:'',
    delete_logic: '',
    is_deleted: '',
    last_update: '',
    user_update: ''

}
let establishmentData = {
    is_establishment_changed: false,
    upload_file: false,
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
    is_address_establishment_changed: false,
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
    status_upload_file: '',
    file_upload_changed: false,
}
let referenceData = {
    is_reference_changed: false,
    id: '',
    title: '',
    name: '',
    surname: '',
    status: '',
    phone: ''
}
let trianData = {
    is_trian_changed: false,
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

let assistantOperatorData = {
    is_assistant_changed: false,
    id: '',
    title: '',
    name: '',
    surname: '',
    personal_id: ''
}
let imageDisplayFormDatabase = []

function deleteAssistant(){
    assistantOperatorData = {
        is_assistant_changed: false,
        id: '',
        title: '',
        name: '',
        surname: '',
        personal_id: ''
    }
    requestData.personal_id_assistant = ''
}
function resetRequestData() {
    filePdf = {
        name: '',
        data: ''
    }
    requestData = {
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
        doc_no3: 'N',
        doc_no4: 'N',
        doc_no5: 'N',
        doc_no6: 'N',
        subcategory: '',
        product_type: '',
        sell_start: '',
        sell_end: '',
        sell_allow: 'N',
        //Money Y1
        receipt_order: '',
        receipt_fine: 0,
        receipt_fee: 0,
        receipt_total: 0,
        //Money Y2
        receipt_order_year_2: '',
        receipt_fine_year_2: 0,
        receipt_fee_year_2: 0,
        receipt_total_year_2: 0,
        //Money Y3
        receipt_order_year_3: '',
        receipt_fine_year_3: 0,
        receipt_fee_year_3: 0,
        receipt_total_year_3: 0,
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
        last_update: '',
        username: ''

    }
    establishmentData = {
        is_establishment_changed: false,
        upload_file: false,
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
    addressEstablishmentData = {
        is_address_establishment_changed: false,
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
    addressOwnerLandData = {
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
    landData = {
        is_land_changed: false,
        id: "",
        address_id: "",
        title: '',
        name: '',
        surname: '',
        birthday: "",
        phone: "",
        status_upload_file: '',
        file_upload_changed: false,
    }
    referenceData = {
        is_reference_changed: false,
        id: '',
        title: '',
        name: '',
        surname: '',
        status: '',
        phone: ''
    }
    trianData = {
        is_trian_changed: false,
        id: '',
        issuse: '',
        date_exp: '',
        date_issued: ''
    }
    operatorAddressData = {
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
    operatorData = {
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
    assistantOperatorData = {
        is_assistant_changed: false,
        id: '',
        title: '',
        name: '',
        surname: '',
        personal_id: ''
    }
    imageDisplayFormDatabase = []

    file_is_uploaded = false
    filesPdf = null
    image_changed = false
    totalFiles = []
    selectImageFile = 0
    maxImageFile = 8
    if(document.getElementById('outputImage') != undefined){
      document.getElementById('outputImage').innerHTML = ''  
    }
    

    // use land 
    if (document.getElementById('notuseOtherPlace') != undefined) {
        document.getElementById('notuseOtherPlace').check = true
        document.getElementById('boxOwner').style.display = 'none'
    }
    // food
    if (document.getElementById('foodNoTrain') != undefined) {
        document.getElementById('foodNoTrain').check = true
        document.getElementById('boxFood').style.display = 'none'
    }
    // sura
    if (document.getElementById('notuseSpirits') != undefined) {
        document.getElementById('notuseSpirits').check = true
    }

}