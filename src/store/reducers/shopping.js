const INITIAL_STATE = {
    shoppingCart: {products: {}, totalPrice: 0, totalQuantity: 0},
    stock:{
        1:{quantity: 5},
        2:{quantity: 5},
        3:{quantity: 5},
        4:{quantity: 5},
        5:{quantity: 5},
        6:{quantity: 5},
        7:{quantity: 5},
        8:{quantity: 5},
        9:{quantity: 5},
        10:{quantity: 5}
    },
    products: [
        {id: 1, name: "Rice", price: 3.65, weight: "1kg", brand: "Romãozinho", validity: "25/12/2021"},
        {id: 2, name: "Beans", price: 4.49, weight: "1kg", brand: "Nene", validity: "26/12/2021"},
        {id: 3, name: "Noodle", price: 3.00, weight: "500g", brand: "Adria", validity: "25/12/2021"},
        {id: 4, name: "Soy oil", price: 7.25, weight: "900ml", brand: "Soya", validity: "25/12/2021"},
        {id: 5, name: "Olive oil", price: 18.75, weight: "500ml", brand: "Andorinha", validity: "23/12/2021"},
        {id: 6, name: "Mayonnaise", price: 4.49, weight: "250g", brand: "Hellmann's", validity: "21/12/2021"},
        {id: 7, name: "Cassava flour", price: 4.50, weight: "1kg", brand: "Yoki", validity: "18/12/2021"},
        {id: 8, name: "Coffe", price: 9.99, weight:"500g", brand: "Melitta", validity: "15/12/2021"},
        {id: 9, name: "Tea", price: 4.15, weight: "16g", brand: "Leão", validity: "25/08/2021"},
        {id: 10, name: "Milk", price: 3.80, weight: "1L", brand: "Piracanjuba", validity: "17/12/2021"}
    ]
};

function addProduct(state, product, quantity) {

    const productId = product.id;
    const productPrice = product.price;
    let shoppingCart = state.shoppingCart.products;
    let stock = state.stock;

    if(quantity > 0 && quantity <= stock[productId].quantity){
        if(shoppingCart[productId] === undefined){
            shoppingCart[productId] = {quantity: quantity};
        }else{
            shoppingCart[productId] = {quantity: shoppingCart[productId].quantity + quantity};
        }
        stock[productId].quantity -= quantity;
        return {
            stock: stock,
            shoppingCart: {
                products: shoppingCart,
                totalPrice: state.shoppingCart.totalPrice + productPrice * quantity,
                totalQuantity: state.shoppingCart.totalQuantity + quantity
            }
        }
    }
}

function removeProduct(state, product, quantity) {

    const productId = product.id;
    const productPrice = product.price;
    let shoppingCart = state.shoppingCart.products;
    let stock = state.stock;

    if(quantity > 0 && shoppingCart[productId].quantity !== undefined){

        if(quantity <= shoppingCart[productId].quantity){
            shoppingCart[productId] = {quantity: shoppingCart[productId].quantity - quantity};
            stock[productId].quantity += quantity;

            if(shoppingCart[productId].quantity === 0){
                delete shoppingCart[productId];
            }

            return {
                stock: stock,
                shoppingCart: {
                    products: shoppingCart,
                    totalPrice: state.shoppingCart.totalPrice - productPrice * quantity,
                    totalQuantity: state.shoppingCart.totalQuantity - quantity
                }
            }
        }
    }
}

export default function shopping(state = INITIAL_STATE, action){

    if(action.type === 'ADD_PRODUCT'){
        const updatedShopping = addProduct(state, action.product, action.quantity);
        if (updatedShopping !== undefined){
            return { ...state, shoppingCart: updatedShopping.shoppingCart, stock: updatedShopping.stock};
        }
    }else if(action.type === 'REMOVE_PRODUCT'){
        const updatedShopping = removeProduct(state, action.product, action.quantity);
        if (updatedShopping !== undefined){
            return { ...state, shoppingCart: updatedShopping.shoppingCart, stock: updatedShopping.stock};
        }
    }
    return state;
}