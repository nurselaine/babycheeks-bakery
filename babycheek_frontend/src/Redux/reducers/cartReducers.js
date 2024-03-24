import {
  FETCH_MENUITEMS_REQUEST,
  FETCH_MENUITEMS_SUCCESS,
  FETCH_MENUITEMS_FAILURE,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  LOAD_CART,
  PROCESS_ORDER,
  COMPLETE_ORDER,
  ADD_CUSTOMER_INFO,
  UPDATE_ORDER_ID,
  EMPTY_CART,
} from "../actionTypes/actionTypes";

export const initialState = {
  loading: false,
  error: null,
  menuItems: [
    {
      item_id: 0,
      item_name: "Peanut Butter Cookies & Cream",
      item_description:
        "A smooth mix of chocolate and peanut butter, studded with the tasty crunch of cookies and cream bits",
      item_assets: {
        bg: "./assets/bg/pb_ncream_bg.png",
        mbg: "./assets/mobile/pb_ncream_mbg.png",
        cookie: "./assets/item/pb_ncream_cookie.png",
      },
      pricing: {
        single: 5.4,
        half_dozen: 18.5,
        dozen: 28.0,
      },
    },
    {
      item_id: 1,
      item_name: "Lemon Poppy Seed",
      item_description:
        "A zesty lemon cookie packed with poppy seeds, then stuffed with lemon filling and smothered in a lemon almond glaze",
      item_assets: {
        bg: "./assets/bg/lemon_poppy_bg.png",
        mbg: "./assets/mobile/lemon_poppy_mbg.png",
        cookie: "./assets/item/lemon_poppy_cookie.png",
      },
      pricing: {
        single: 4.75,
        half_dozen: 18.5,
        dozen: 28.0,
      },
    },
    {
      item_id: 2,
      item_name: "Mild Chocolate Chip",
      item_description:
        "The classic - you cannot go wrong. Thick, soft, and packed with milk chocolate chips",
      item_assets: {
        bg: "./assets/bg/original_bg.png",
        mbg: "./assets/mobile/original_mbg.png",
        cookie: "./assets/item/original_cookie.png",
      },
      pricing: {
        single: 4.0,
        half_dozen: 18.5,
        dozen: 28.0,
      },
    },
    {
      item_id: 3,
      item_name: "Cookie Butter White Chip",
      item_description:
        "A warm cookie butter cookie packed with cookie butter pieces and creamy white chips",
      item_assets: {
        bg: "./assets/bg/cookie_butter_bg.png",
        mbg: "./assets/mobile/cookie_butter_mbg.png",
        cookie: "./assets/item/cookie_butter_cookie.png",
      },
      pricing: {
        single: 4.45,
        half_dozen: 18.5,
        dozen: 28.0,
      },
    },
    {
      item_id: 4,
      item_name: "Midnight Mint",
      item_description:
        "A warm chocolate cookie filled with a classic mix of semi-sweet chocolate and mint chips",
      item_assets: {
        bg: "./assets/bg/mint_choc_bg.png",
        mbg: "./assets/mobile/mint_choc_mbg.png",
        cookie: "./assets/item/mint_choc_cookie.png",
      },
      pricing: {
        single: 5.0,
        half_dozen: 18.5,
        dozen: 28.0,
      },
    },
    {
      item_id: 5,
      item_name: "Original with M&M's Candies",
      item_description:
        "The tried and true cookie peppered with sweet and crispy M&M's candies",
      item_assets: {
        bg: "./assets/bg/mnm_bg.png",
        mbg: "./assets/mobile/mnm_mbg.png",
        cookie: "./assets/item/mnm_cookie.png",
      },
      pricing: {
        single: 4.25,
        half_dozen: 18.5,
        dozen: 28.0,
      },
    },
  ],
  shopping_cart: {
    menu_item: [], // { item_id: -1, item_name: "", quantity: 0 }
    subtotal: 0,
    total: 0,
  },
  item_counter: [
    { item_id: 0, counter: 0 },
    { item_id: 1, counter: 0 },
    { item_id: 2, counter: 0 },
    { item_id: 3, counter: 0 },
    { item_id: 4, counter: 0 },
    { item_id: 5, counter: 0 },
  ],
  active_order: false,
  complete_order: false,
  customer_info: {
    firstname: "",
    lastname: "",
  },
  order_id: "",
};

const cartReducer = (state = initialState, action) => {
  console.log("ACTION::::", action);
  switch (action.type) {
    case FETCH_MENUITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MENUITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: action.payload,
      };
    case FETCH_MENUITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        item_counter: state.item_counter.map((item) =>
          item.item_id === action.item_id
            ? { ...item, counter: item.counter + 1 }
            : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        item_counter: state.item_counter.map((item) =>
          item.item_id === action.item_id
            ? { ...item, counter: item.counter - 1 }
            : item
        ),
      };
    case UPDATE_ITEM:
      return {
        ...state,
        item_counter: state.item_counter.map((count, index) =>
          index === action.item_id ? action.value : count
        ),
      };
    case LOAD_CART:
      const shoppingCartItems = state.item_counter
        .filter((item) => item.counter > 0)
        .map((item) => ({
          item_id: item.item_id,
          quantity: item.counter,
          item_name: state.menuItems.find(
            (menuItem) => menuItem.item_id === item.item_id
          )?.item_name,
          price: state.menuItems.find(
            (menuItem) => menuItem.item_id === item.item_id
          )?.pricing.single,
        }));

      const cartTotal = shoppingCartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);

      const total = cartTotal + cartTotal * 0.15;
      return {
        ...state,
        shopping_cart: {
          menu_item: shoppingCartItems,
          subtotal: cartTotal,
          total: total,
        },
      };
    case PROCESS_ORDER:
      return {
        ...state,
        active_order: !state.active_order,
      };
    case COMPLETE_ORDER:
      return {
        ...state,
        complete_order: !state.complete_order,
      };
    case ADD_CUSTOMER_INFO:
      return {
        ...state,
        customer_info: {
          firstname: action.firstname,
          lastname: action.lastname,
        },
      };
    case UPDATE_ORDER_ID:
      return {
        ...state,
        order_id: action.order_id,
      };
    case EMPTY_CART:
      return {
        ...state,
        shopping_cart: {
          menu_item: [], // { item_id: -1, item_name: "", quantity: 0 }
          subtotal: 0,
          total: 0,
        },
        item_counter: [
          { item_id: 0, counter: 0 },
          { item_id: 1, counter: 0 },
          { item_id: 2, counter: 0 },
          { item_id: 3, counter: 0 },
          { item_id: 4, counter: 0 },
          { item_id: 5, counter: 0 },
        ],
      };
    default:
      return state;
  }
};

export default cartReducer;
