import React from "react";
import {Button, Popover, InputNumber } from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import './index.css';

import * as ShoppingActions from '../../store/actions/shopping';

    const Products = ({products, addProduct, removeProduct, shoppingCart, stock}) => (
            <section>
                    { products.map(product =>
                        <div key={product.id} className="product-div">

                            <Popover title="Details"
                                    content={
                                    <div className="details">
                                        <strong>Brand</strong>: {product.brand} <br/>
                                        <strong>Quantity</strong>: {product.weight} <br/>
                                        <strong>Expiration date</strong>: {product.validity} <br/>
                                    </div>
                                    }
                                    placement="right"
                                    open={true}
                                    className="popover"
                                    >

                                <div className="product">
                                    <br/>
                                    <img className="product-img" alt={product.name} src={process.env.PUBLIC_URL.concat("img/produto-").concat(product.id).concat(".jpg")} />
                                    <br/>
                                </div> 
                            </Popover>
                            <div className="description">
                                {product.name} 
                            </div>
                            <strong>R$ {product.price.toFixed(2)}</strong>  
                            <br/>
                            <div className="buy">
                                {
                                    shoppingCart.products && shoppingCart.products[product.id] ?
                                        <div>
                                            <InputNumber addonBefore={<Button type="link" onClick={() => removeProduct(product, 1)} danger
                                                                                                 className="buttonRemove">
                                                                                            <MinusOutlined className="iconRemove" />
                                                                                            </Button>} 
                                                                            addonAfter={<Button type="link" onClick={() => addProduct(product, 1)} danger
                                                                                                className="buttonAdd">
                                                                                            <PlusOutlined  className="iconAdd" />
                                                                                            </Button>} 
                                                    value={shoppingCart.products[product.id].quantity} 
                                                    size="medium" disabled  
                                                    max={stock[product.id].quantity}
                                                    className="inputProducts" 
                                                    /> 
                                        </div>
                                        :
                                        <div>
                                            <Button type="primary" onClick={() => addProduct(product, 1)} danger className="button">
                                            <PlusOutlined /> ADD TO CART
                                            </Button>
                                        </div>
                                }
                            </div>
                            <br/>
                        </div>
                    ) }

            </section>
    );

    const mapStateToProps = state => ({
        products: state.shopping.products,
        shoppingCart: state.shopping.shoppingCart,
        stock: state.shopping.stock
    })

    const mapDispatchToProps = dispatch =>
        bindActionCreators(ShoppingActions, dispatch);

    export default connect(mapStateToProps, mapDispatchToProps)(Products)