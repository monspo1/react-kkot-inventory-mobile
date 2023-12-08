export const itemCategoryArr = [
    { label: 'Cans / Glasses', value: 'Cans/Glasses', example: "Ex) 캔 음식, 보존 음식류, ..." },
    { label: 'Clothing / Shoes', value: 'Clothing/Shoes', example: "Ex) 의류, 천, 신발류, ..." },
    { label: 'Diaper / Pads / Etc', value: 'Diaper/Pads/Etc', example: "Ex) 기저귀, 패드, 환자용 깔개, ..." },
    { label: 'Flours', value: 'Flours', example: "Ex) 가루로 된 것, 밀가루, 옥수수가루, 녹말가루, ..." },
    { label: 'Furniture', value: 'Furniture', example: "Ex) 의자, 데스크, ...." },
    { label: 'Grains / Cereals', value: 'Grains/Cereals', example: "Ex) 쌀, 콩, 잡곡, 시리얼, ..." },
    { label: 'Medical Supplies', value: 'MedicalSupplies', example: "Ex) 의약품, 의료용품, 의료기구, ..." },
    { label: 'Necessities / Coffee', value: 'Necessities/Coffee', example: "Ex) 설탕, 소금, 소스, 양념, 숩, 커피, ..." },
    { label: 'Others', value: 'Others', example: "Ex) 기타용품, 장난감, 우산, ...." },
    { label: 'Pastas / Noodles', value: 'Pastas/Noodles', example: "Ex) 파스타, 스파게티, 라면, 국수, ..." },
    { label: 'Snacks / Juice', value: 'Snacks/Juice', example: "Ex) 쿠키, 초콜렛, 캔디, 쥬스, 음료, ..." },
];

export const categoryColors = [
    { label: 'Cans / Glasses', backgroundColor: '#800000', color: 'white' },
    { label: 'Clothing / Shoes', backgroundColor: '#f5a018', color: '#fff' },
    { label: 'Diaper / Pads / Etc', backgroundColor: '#ffe119', color: '#331d00' },
    { label: 'Flours', backgroundColor: '#bfef45', color: '#001703' },
    { label: 'Furniture', backgroundColor: '#3cb44b', color: 'white'  },
    { label: 'Grains / Cereals', backgroundColor: '#42d4f4', color: '#000075'  },
    { label: 'Medical Supplies', backgroundColor: '#4363d8', color: 'white'  },
    { label: 'Necessities / Coffee', backgroundColor: '#911eb4', color: '#fddbff'  },
    { label: 'Others', backgroundColor: '#f032e6', color: 'white' },
    { label: 'Pastas / Noodles', backgroundColor: '#000075', color: '#e7e6ff' },
    { label: 'Snacks / Juice', backgroundColor: '#dcbeff', color: '#000075' }
]

export const boxInitialColors = [
    { backgroundColor: '#800000', color: 'white' },{ backgroundColor: '#c71585', color: 'white' },
    { backgroundColor: '#ff7f50', color: 'white' },{ backgroundColor: '#00bfff', color: 'white' },
    { backgroundColor: '#ffd700', color: 'white' },{ backgroundColor: '#adff2f', color: '#006600' },
    { backgroundColor: '#006400', color: 'white' },{ backgroundColor: '#483d8b', color: 'white' },
    { backgroundColor: '#4169e1', color: 'white' },{ backgroundColor: '#20b2aa', color: 'white' },
    { backgroundColor: '#4b0082', color: 'white' },{ backgroundColor: '#f4a460', color: 'white' },
    { backgroundColor: '#191970', color: 'white' },{ backgroundColor: '#ba55d3', color: 'white' },
]

export const tempDataForBoxList = [
    { 
        box_initial: "NJK-99",
        box_desc: "box items by asldfjk, aslkdfja, afslkj",
        items_count: 7,
        items_weight: 35.98,
        items_price: 123.99,
    },
    { 
        box_initial: "KKT-99",
        box_desc: "box items by asldfjk, aslkdfja, afslkj",
        items_count: 5,
        items_weight: 24.98,
        items_price: 77.99,
    },
    { 
        box_initial: "WWW-93",
        box_desc: "box items by asldfjk, aslkdfja, afslkj",
        items_count: 11,
        items_weight: 44.32,
        items_price: 99.99,
    },
    { 
        box_initial: "ABC-89",
        box_desc: "box items by asldfjk, aslkdfja, afslkj",
        items_count: 17,
        items_weight: 11.98,
        items_price: 323.99,
    },
]

export const tempDataForItemList = [
    { 
        box_id: "key-12314-1",
        item_barcode: "0129341284712",
        item_brand: "Durapore",
        item_content: "textForContent",
        item_expiration: '2099-10-28T05:00:00.000Z',
        item_weight_oz: "35.98",
        item_weight_lbs: "11.23",
        item_weight_g: "3.49",
        item_price: "11.98",
        item_category: "Medical Supplies",
        item_count: "1",
    },
    { 
        box_id: "key-12314-2",
        item_barcode: "98491273412",
        item_brand: "K Swiss",
        item_content: "Men's Shoes Size 8/15",
        item_expiration: '2030-02-25T05:00:00.000Z',
        item_weight_oz: "35.98",
        item_weight_lbs: "11.23",
        item_weight_g: "3.49",
        item_price: "11.98",
        item_category: "Clothing / Shoes",
        item_count: "3",
    },
    { 
        box_id: "key-asdfas-1",
        item_barcode: "092384123-32841",
        item_brand: "NIPRO",
        item_content: "Hoisan sauce",
        item_expiration: '2025-08-14T05:00:00.000Z',
        item_weight_oz: "35.98",
        item_weight_lbs: "11.23",
        item_weight_g: "3.49",
        item_price: "11.98",
        item_category: "Pastas / Noodles",
        item_count: "2",
    },
    { 
        box_id: "key-12344314-1",
        item_barcode: "13241234123412",
        item_brand: "Moderna",
        item_content: "Small elbow 7.05z",
        item_expiration: "2021-03-04T05:00:00.000Z",
        item_weight_oz: "35.98",
        item_weight_lbs: "11.23",
        item_weight_g: "3.49",
        item_price: "11.98",
        item_category: "Grains / Cereals",
        item_count: "7",
    },
    { 
        box_id: "key-bbbb-1",
        item_barcode: "421345sfads2134123",
        item_brand: "GLICO",
        item_content: "Single use syrings 10ml",
        item_expiration:'2027-12-24T05:00:00.000Z',
        item_weight_oz: "35.98",
        item_weight_lbs: "11.23",
        item_weight_g: "3.49",
        item_price: "11.98",
        item_category: "Others",
        item_count: "3",
    },
]