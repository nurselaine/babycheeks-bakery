
export async function useGetOrders() {
  const fulfilledOrders = await fetch('http://localhost:3001/db/getFulfilled')
  .then((response) => response.json())
  .then((data) => {return data.fullfilled_orders})
  .catch((error) => console.error(error))

  const unfulfilledOrders = await fetch('http://localhost:3001/db/getUnfulfilled')
  .then((response) => response.json())
  .then((data) => {return data.unfullfilled_orders})
  .catch((error) => console.error(error))

  const allOrders = fulfilledOrders.concat(unfulfilledOrders);

  return Promise.resolve(allOrders);
}
