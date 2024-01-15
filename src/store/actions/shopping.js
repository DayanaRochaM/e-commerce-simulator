export function addProduct(product, quantity){
    return {
        'type': 'ADD_PRODUCT',
        product,
        quantity
    };
}

export function removeProduct(product, quantity){
    return {
        'type': 'REMOVE_PRODUCT',
        product,
        quantity
    };
}