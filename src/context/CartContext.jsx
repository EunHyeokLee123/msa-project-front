import React, { useReducer } from 'react';

// 리듀서 함수 정의
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CART':
      //추가하려는 상품의 아이디가 카트에 있냐?
      console.log('여기는 cartContext에서 카트에 강의를 추가하려는 곳');

      console.log(action.product);

      const excistProduct = state.productsInCart.find(
        (p) => p.id === action.product,
      );

      let updateProduct;
      //   let totalQuantity = (state.totalQuantity += action.product.quantity);

      if (excistProduct) {
        // 상품이 이미 카트에 있구나
        // 다른 상품은 그대로 유지, id가 같은 상품의 quantity만 수정
        alert('해당 강의는 이미 수강바구니에 존재합니다!');
      } else {
        // 상품이 처음 카트에 담기는 거라면 기존 로직 유지.
        updateProduct = [...state.productsInCart, action.product];
      }

      // 세션 스토리지에 카트 상태를 저장. (새로고침 해도 안날아가게)
      // 로컬, 세션 스토리지에 저장하는 데이터가 객체(배열)인 경우 저장 안됨
      // 문자열만 받습니다.
      // JSON 문자열화 해서 저장하실 수 있습니다.
      sessionStorage.setItem('productsInCart', JSON.stringify(updateProduct));
      //   sessionStorage.setItem('totalQuantity', totalQuantity);

      return {
        productsInCart: updateProduct,
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
  addCart: () => {},
  clearCart: () => {},
});

export const CartContextProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    // JSON 문자열로 저장한 객체, 배열을 JS 타입으로 변환하는 JSON.parse()
    // totalQuantity는 정수로 변환 -> 연산해야 되니까.
    productsInCart: JSON.parse(sessionStorage.getItem('productsInCart')) || [],
  });

  const addCart = (product) => {
    dispatch({
      type: 'ADD_CART',
      product,
    });
    // console.log('장바구니: ', cartState);
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        productsInCart: cartState.productsInCart,
        totalQuantity: cartState.totalQuantity,
        addCart,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
