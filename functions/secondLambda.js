"use strict";

module.exports.handler = async (event) => {
  console.log("Event:", event);

  const economicFields = {
    name: event.name,
    email: event.email,
    phone: event.phone,
    currency: event.currency,
    city: event.city,
    address: event.address,
    zip: event.zip,
    country: event.country,
    customerGroup: 1,
    paymentTerms: event.paymentTerms,
    vatZone: event.vatZone,
    productNumber: event.productNumber,
    productGroup: 1,
    lineItems: event.lineItems
  };

  const url = "https://restapi.e-conomic.com/customers";
  const options = {
    method: "GET",
    headers:{
        "x-appsecrettoken": "nntAGvRf6nBtnqevEySMS5VXK8vo0CymIKHXHFXNjok",
        "x-agreementgranttoken": "cjDPM04dyBm8VyLPvMXJK1DnmQeZmyEghxtNv1kRocg1",
        "content-type": "application/json",
    }
  }

  const getAllCustomerData = async() =>{
    try{
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Response data:', data);
        return data;
    }catch(err){
        console.log(err);
    }
  }

  const allCustomersData = await getAllCustomerData();

  console.log('All customers data:', allCustomersData.collection);
  
  const a = allCustomersData.collection;

const filteredByEmail = (a, email) => {
 return a.filter((record) => {
    return record.email === email;
 });
};

  const filteredDataByEmail = filteredByEmail(a, economicFields.email)

  console.log('Filtered customers data:', filteredDataByEmail);

  const customerData = {
    currency: event.currency,
    customerGroup: {
        customerGroupNumber:1
    },
    name: event.name,
    paymentTerms: {
        paymentTermsNumber:1
    },
    vatZone: {
        vatZoneNumber: 1
    }
}

const customerOptions = {
    method: "POST",
    headers:{
        "x-appsecrettoken": "nntAGvRf6nBtnqevEySMS5VXK8vo0CymIKHXHFXNjok",
        "x-agreementgranttoken": "cjDPM04dyBm8VyLPvMXJK1DnmQeZmyEghxtNv1kRocg1",
        "content-type": "application/json",
    },
    body: JSON.stringify(customerData)
}
let data;

async function createCustomer () {
    try{

        const res = await fetch(url, customerOptions);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
        const data = await res.json();
        console.log("Customer created sucessfully ::: ",data);
        return data;

    }catch(err){
        console.log('Error creating customer: ', err);

    }
}

let customer

  if(filteredDataByEmail.length == 0){
     customer = await createCustomer();
    console.log("Customer created sucessfully ::: ", customer)
  }

  const productURL= "https://restapi.e-conomic.com/products";

const getAllProducts = async() =>{
    try{
        const res = await fetch(productURL, options);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Response data:', data);
        return data;
    }catch(err){
        console.log(err);
    }
};

const allProductsData = await getAllProducts();

console.log('All products data:', allProductsData.collection);

const matchedProducts = allProductsData.collection.filter(element => economicFields.productNumber.includes(element.productNumber));

console.log('Filtered data by product number:', matchedProducts);

//review below code TODO
const productFields = {
    productNumber: economicFields.productNumber[0],
    name: event.name,
    salesPrice : parseFloat(event.lineItems[0].price),
    costPrice:parseFloat(event.lineItems[0].price),
    productGroup:{
        productGroupNumber: 1
    },
    
};
console.log("productFields",productFields)


const productOptions = {
    method: "POST",
    headers:{
        "x-appsecrettoken": "nntAGvRf6nBtnqevEySMS5VXK8vo0CymIKHXHFXNjok",
        "x-agreementgranttoken": "cjDPM04dyBm8VyLPvMXJK1DnmQeZmyEghxtNv1kRocg1",
        "content-type": "application/json",
    },
    data: JSON.stringify(productFields)
};


async function createProduct(){
    try{

        const res = await fetch(productURL, productOptions);
        if (!res.ok) {
            throw new Error(`Product already exists: ${res.status}`);
          }
        const data = await res.json();
        console.log("Product created sucessfully ::: ",data);
        return data;

    }catch(err){
        console.log('Error creating product: ', err);

    }
}

if(matchedProducts.length == 0){
    //create product
    const prod = await createProduct();

    console.log("Product created", prod);
}

const invoiceFields = {
    currency: event.currency,
    customer:{
        customerNumber: customer.customerNumber
    },
    date: "2024-03-14",
    layout: {
        layoutNumber: 19
    },
    paymentTerms: {
                paymentTermsNumber: 5,
                daysOfCredit: 30,
                name: "Netto 30 dage",
                paymentTermsType: "net",
                self: "https://restapi.e-conomic.com/payment-terms/5"
            },
    recipient: {
        name: event.name,
        address: event.address,
        city: event.city,
        zip: event.zip,
        vatZone:{
            name: "domestic",
            vatZoneNumber:event.vatZone,
            self: `https://restapi.e-conomic.com/vat-zones/${event.vatZone}`
        }
        
    },
    
}

console.log(invoiceFields)

const invoiceOptions = {
    method: "POST",
    headers:{
        "x-appsecrettoken": "nntAGvRf6nBtnqevEySMS5VXK8vo0CymIKHXHFXNjok",
        "x-agreementgranttoken": "cjDPM04dyBm8VyLPvMXJK1DnmQeZmyEghxtNv1kRocg1",
        "content-type": "application/json",
    },
    data: JSON.stringify(invoiceFields)
};

const invoiceURL = "https://restapi.e-conomic.com/invoices/drafts";

async function createInvoice(){
    try{

        const res = await fetch(invoiceURL, invoiceOptions);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
        const data = await res.json();
        console.log("Invoice created sucessfully ::: ",data);
        return data;

    }catch(err){
        console.log('Error creating invoice: ', err);

    }
}

const invoice = await createInvoice();
console.log(invoice);

};
