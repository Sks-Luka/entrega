const socketClient = io();

socketClient.on('saludodesdeback',(message)=>{
    console.log(message);
    socketClient.emit('respuestadesdefront', 'Muchas gracias')
})

const form = document.getElementById('form')
const nameInput = document.getElementById('name')
const priceInput = document.getElementById('price')
const products = document.getElementById('products')

form.onsubmit = (e) =>{
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    const products = {
        name,
        price
    };
    socketClient.emit('newproduct', products);
}


socketClient.on('products',(arrayProducts)=>{
    let infoProducts =  '' ;
    arrayProducts.map((prod)=>{
        infoProducts += `${prod.name} - $ ${prod.price}`
    })
    products.innerHTML = infoProducts ;

})


socketClient.on('message',(message)=>{
    console.log(message);
})