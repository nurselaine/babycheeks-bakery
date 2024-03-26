export async function useOrderStatusUpdater(orderID) {
  const updateResponse = await fetch(`http://localhost:3001/db/updateOrderStatus/${orderID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data) => {return data.message})
  .catch((error) => console.error(error));

  console.log(updateResponse);
  return Promise.resolve(updateResponse)
}