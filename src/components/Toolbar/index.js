import React, {useState} from "react";
import {connect} from "react-redux";
import { Avatar, Badge, Button} from 'antd';
import {ShoppingCartOutlined, WalletOutlined } from '@ant-design/icons';
import './index.css';

import ShoppingCartModal from '../Modal';

const Toolbar = ({ shoppingCart }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div id={"toolbar"}>
            <div className="left-toolbar"> 
                <img alt={"logo"} src={process.env.PUBLIC_URL.concat("img/logo").concat(".png")} width={90} />
            </div>
            <div className="right-toolbar"> 

                <span className="shopping-items">
                    <Button type="primary" icon={
                        <Badge count={shoppingCart.totalQuantity}>
                            <Avatar icon={<ShoppingCartOutlined className={"shopping-cart"} />}/>
                        </Badge>} size={'large'} onClick={()=> showModal()}/>
                </span>

                <div className="shopping-price">
                    <strong>
                    TOTAL
                    <br/>
                    R$ {shoppingCart.totalPrice.toFixed(2)}
                    </strong>
                </div>

                {shoppingCart.totalQuantity > 0 && <Button className="finish-btn" danger ><WalletOutlined />Checkout</Button>}

            </div>
            <ShoppingCartModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}/>
        </div>
);}

export default connect(state => ({
    shoppingCart: state.shopping.shoppingCart
}))(Toolbar);

