import React from "react";
import { Modal, Button, InputNumber} from 'antd';
import {PlusOutlined, MinusOutlined, ShoppingCartOutlined} from '@ant-design/icons';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import './index.css';

import * as ShoppingActions from '../../store/actions/shopping';

const ShoppingCartModal = ({shoppingCart, stock, products, removeProduct, addProduct, isModalVisible, handleOk, handleCancel}) => {
    console.log(shoppingCart)
    return(
    <div className="shopping-modal">
        <Modal className="modal" title={<div><ShoppingCartOutlined /> Cart Items</div>} open={isModalVisible} onCancel={handleCancel} 
               footer={
                        <div className='div-ok-button'>
                            <Button
                                type='primary'
                                onClick={handleOk}
                                danger>
                                Ok
                            </Button>
                        </div>
                }>

            {Object.keys(shoppingCart.products).map(item =>
                { 
                const product = products[parseInt(item)-1];

                return <div key={item} className="item-div">

                    <img className="item-img" alt={"item-".concat(item)} src={process.env.PUBLIC_URL.concat("img/produto-").concat(item).concat(".jpg")} />
                    <div className="item-data">
                        <strong>{products[parseInt(item)-1].name}</strong> <br/>
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
                        <br/><br/>
                        <div className="item-total">
                            <strong> R$  {(products[parseInt(item)-1].price * shoppingCart.products[item].quantity).toFixed(2)}</strong>
                        </div>
                    </div>

                    <div className="item-quantity">
                        
                    </div>

                </div>
                }
            )}

            <div className="shopping-total">
                <div className="shopping-labels">
                    <strong> 
                            TOTAL
                    </strong>
                </div>

                <div className="shopping-resume">
                    <strong> 
                            R$ {shoppingCart.totalPrice.toFixed(2)}
                    </strong>
                </div>
            </div>

        </Modal>
    </div>
);
}

const mapStateToProps = state => ({
    products: state.shopping.products,
    shoppingCart: state.shopping.shoppingCart,
    stock: state.shopping.stock
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(ShoppingActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartModal)
