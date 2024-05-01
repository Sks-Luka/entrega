import  fs  from 'fs';

export default class ProductManager {
    constructor(path){
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const product = await fs.promises.readFile(this.path, "utf8");//Leemos el path en caso de exitir
                return JSON.parse(product)//Lo pasamos a formato JavaScript para poder manipularlo
            } else return   [];
            } catch (error) {
                console.log(error);
            }
        }

        async addProducts(product) {
            try {
                const products = await this.getProducts(); // Obtengo los productos
                product.id = this.getProductoID() + 1; // Le añadimos el id autogenerado
        
                // Verificamos si products es un array antes de usar push
                if (!Array.isArray(products)) {
                    throw new Error("La variable 'products' no es un array.");
                }
        
                products.push(product); // Agregamos el producto al array
                await fs.promises.writeFile(this.path, JSON.stringify(products)); // Guardo luego de pasarlo a JSON
            } catch (error) {
                console.log(error);
            }
        }
        


    async getProductById(id){
        try {
            const product = await this.getProducts();// Obtengo los productos
            return product.find(product => product.id === id);// Verifica si el id coincide y lo retorna
        } catch (error) {
            console.log(error);
        }
    }


    async updateProduct(id, newTitle) {
        try {
            const productToUpdate = await this.getProductById(id); // Utiliza getProductById para obtener el producto 
    
            if (productToUpdate) { // Verifica si se encontró el producto
                const products = await this.getProducts(); // Obténgo todos los productos
                const productIndex = products.findIndex(product => product.id === id); // Encuentra el índice del producto a actualiza
    
                if (productIndex !== -1) {// verifica
                    products[productIndex].title = newTitle; // Actualiza el título del producto
                    await fs.promises.writeFile(this.path, JSON.stringify(products)); // Escribe el array completo actualizado
                }

            } else {
                console.log(`Producto con Id ${id} no encontrado.`);
            }
        } catch (error) {
            console.log(error);
        }
    }



    async deleteProduct(id){
        try {
            const deleteProduct = await this.getProductById(id); // Utiliza getProductById para obtener el producto específico
            if(deleteProduct){
                const products = await this.getProducts(); // Obténgo todos los productos
                const productIndex = products.findIndex(product => product.id === id); // Busca en este caso el id del producto a eliminar

                if (productIndex !== -1) { // verifica 
                    products.splice(productIndex, 1); // Elimina el producto del array
                    await fs.promises.writeFile(this.path, JSON.stringify(products)); // Escribe el array actualizado en el archivo
                    console.log(`Producto con Id ${id} eliminado.`);
                } else {
                    console.log(`Producto con Id ${id} no encontrado.`);
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    getProductoID(){
        const productoID = Math.floor(Math.random()*1000);// Genera un id ramdon
        return productoID;//Lo retorna
    }

}

const manager = new ProductManager("../../users.json");

const producto1 = {
    title: "Pera",
    description:"color Yellow",
    thumbnail:"http://",
    code:1716,
    id:"",
    stock:3000
};

const producto2 = {
    
    title: "Manzana",
    description:"color red",
    thumbnail:"http://",
    code:1711,
    id:"",
    stock:3000
};

const test = async() =>{
    
    //await manager.addProducts(producto2) // agregamos un producto previamente creado
    //await manager.addProducts(producto1)// agregamos un producto previamente creado
    await manager.deleteProduct(98);  // Reemplaza 78 con el ID del producto que quieres eliminar
    //await manager.updateProduct(982,"titulo actualizado") //una ves guardado un producto en el archivo
                                                        // lo podemos modificar llamandolo por id y actualizarlo
    console.log(await manager.getProducts()) //Llama a los products

}
test()

// Una ves que cargamos los productos los podemos elimnar y actualizar cumpliendo con lo pedido!