import React, { useReducer, useState } from 'react';

// 리듀서 함수 정의
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CART':
      console.log('여기는 cartContext에서 카트에 강의를 추가하려는 곳');
      console.log(action.product.id);

      const savedCart =
        JSON.parse(localStorage.getItem('productsInCart')) || [];

      const excistProduct = savedCart.find((p) => p.id === action.product.id);

      let updateProduct;

      if (excistProduct) {
        alert('해당 강의는 이미 수강바구니에 존재합니다!');
        return state;
      } else {
        // 상품이 처음 카트에 담기는 거라면 기존 로직 유지.
        updateProduct = [...savedCart, action.product];
        localStorage.setItem('productsInCart', JSON.stringify(updateProduct));
        alert('강의가 수강바구니에 추가되었습니다!');
        return {
          ...state,
          productsInCart: updateProduct,
        };
      }

    case 'ORDER_COURSE':
      const existProduct = state.productsInCart.find(
        (p) => p.id === action.product.id,
      );

      let updatedProducts = [...state.productsInCart];
      let updatedSelected = new Set(state.selectedProductIds); // Set으로 중복 제거

      if (!existProduct) {
        updatedProducts.push(action.product); // 장바구니에 없으면 추가
      }

      updatedSelected.add(action.product.id); // 무조건 체크 상태로 추가

      // 로컬스토리지 저장
      localStorage.setItem('productsInCart', JSON.stringify(updatedProducts));
      localStorage.setItem(
        'selectedProductIds',
        JSON.stringify([...updatedSelected]), // Set → 배열로 변환
      );

      return {
        ...state,
        productsInCart: updatedProducts,
        selectedProductIds: [...updatedSelected],
      };

    case 'CLEAR_CART':
      // 장바구니 상태를 로컬스토리지에서 제거
      localStorage.removeItem('productsInCart');
      localStorage.removeItem('selectedProductIds');
      return {
        productsInCart: [],
        selectedProductIds: [],
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
  // 초기값을 localStorage에서 가져오도록 수정
  const [cartState, dispatch] = useReducer(cartReducer, {
    productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [],
    selectedProductIds:
      JSON.parse(localStorage.getItem('selectedProductIds')) || [],
  });

  const addCart = (product) => {
    console.log(product);

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
