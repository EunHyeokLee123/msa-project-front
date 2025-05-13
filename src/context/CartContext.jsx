import React, { useReducer, useState } from 'react';

// 리듀서 함수 정의
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CART':
            console.log('여기는 cartContext에서 카트에 강의를 추가하려는 곳');
            console.log(action.product.id);

            const excistProduct = state.productsInCart.find(
                (p) => p.id === action.product.id,
            );

            let updateProduct;

            if (excistProduct) {
                alert('해당 강의는 이미 수강바구니에 존재합니다!');
                return state;
            } else {
                // 상품이 처음 카트에 담기는 거라면 기존 로직 유지.
                updateProduct = [...state.productsInCart, action.product];
                sessionStorage.setItem('productsInCart', JSON.stringify(updateProduct));
                alert('해당 강의가 바구니에 추가되었습니다.');
                return {
                    ...state,
                    productsInCart: updateProduct,
                };
            }

        case 'ORDER_COURSE':
            const existProduct = state.productsInCart.find(
                (p) => p.id === action.product.id,
            );

            let updatedProducts;
            let updatedSelected;

            if (existProduct) {
                // 이미 장바구니에 있는 경우. 체크만
                updatedProducts = state.productsInCart;
                updatedSelected = [...state.selectedProductIds, action.product.id];
            } else {
                // 없으면 추가하고 체크
                updatedProducts = [...state.productsInCart, action.product];
                sessionStorage.setItem(
                    'productsInCart',
                    JSON.stringify(updatedProducts),
                );
                updatedSelected = [...state.selectedProductIds, action.product.id];
            }

            return {
                ...state,
                productsInCart: updatedProducts,
                selectedProductIds: updatedSelected,
            };

        case 'CLEAR_CART':
            sessionStorage.clear();
            return {
                productsInCart: [],
            };
    }
};

// 새로운 Context 생성
const CartContext = React.createContext({
    productsInCart: [],
    addCart: () => { },
    clearCart: () => { },
});

export const CartContextProvider = (props) => {
    const [cartState, dispatch] = useReducer(cartReducer, {
        // JSON 문자열로 저장한 객체, 배열을 JS 타입으로 변환하는 JSON.parse()
        // totalQuantity는 정수로 변환 -> 연산해야 되니까.
        productsInCart: JSON.parse(sessionStorage.getItem('productsInCart')) || [],
        selectedProductIds: [],
    });

    const addCart = (product) => {
        dispatch({
            type: 'ADD_CART',
            product,
        });
    };

    const [forceSelectProductId, setForceSelectProductId] = useState(null);

    const orderCourse = (product) => {
        dispatch({
            type: 'ORDER_COURSE',
            product,
        });
        setForceSelectProductId(product.id);
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider
            value={{
                productsInCart: cartState.productsInCart,
                forceSelectProductId,
                setForceSelectProductId,
                addCart,
                clearCart,
                orderCourse,
                selectedProductIds: cartState.selectedProductIds,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContext;