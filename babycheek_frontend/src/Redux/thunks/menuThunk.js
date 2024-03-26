export const fetchData = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMenuItemsRequest());
    try {
      const response = await fetch('http://localhost:3001/menu/menuItems')
      .then((response) => response.json())
      .then((data) => {return data.menuItems})
      .catch((error) => console.error(error));
      dispatch(fetchMenuItemsSuccess(response.data));
    } catch (error) {
      dispatch(fetchMenuItemsFailure(response.message));
    }
  }
}