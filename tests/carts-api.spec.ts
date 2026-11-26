import { test, expect, APIRequestContext } from '@playwright/test';

test.use({ baseURL: 'https://api.practicesoftwaretesting.com' });

let cartId: string | undefined;

// Product ids change when the site resets, looking the product up by name.
async function findProduct(request: APIRequestContext, name: string) {
  const response = await request.get('/products/search', { params: { q: name } });
  expect(response.status()).toBe(200);
  const results = await response.json();
  const product = results.data.find((item: { name: string }) => item.name === name);
  expect(product).toBeDefined();
  return product;
}

// Delete the cart, even if the test failed.
test.afterEach(async ({ request }) => {
  if (cartId) {
    // console.log(`Deleting cart ${cartId}`);
    const response = await request.delete(`/carts/${cartId}`);
    cartId = undefined;
    expect(response.status()).toBe(204);
  }
});

test('create a cart and add a product', async ({ request }) => {
  const product = await findProduct(request, 'Combination Pliers');

  // Empty cart.
  const created = await request.post('/carts');
  expect(created.status()).toBe(201);
  cartId = (await created.json()).id;
  expect(cartId).toBeTruthy();

  // Then Add 2 Combination Pliers.
  const added = await request.post(`/carts/${cartId}`, {
    data: { product_id: product.id, quantity: 2 },
  });
  expect(added.status()).toBe(200);
  expect(await added.json()).toEqual({ result: 'item added or updated' });

  // Reading the cart back.
  const fetched = await request.get(`/carts/${cartId}`);
  expect(fetched.status()).toBe(200);
  const cart = await fetched.json();
  expect(cart.id).toBe(cartId);
  expect(cart.cart_items).toHaveLength(1);
  // Once you uncomment the next line, the test fails. afterEach still deletes the cart.
  // expect(cart.cart_items[0]).toMatchObject({ quantity: 3 });
  expect(cart.cart_items[0]).toMatchObject({
    quantity: 2,
    product_id: product.id,
    product: { name: 'Combination Pliers', price: product.price },
  });
});

test('a cart id that does not exist returns 404', async ({ request }) => {
  const response = await request.get('/carts/doesnotexist123');
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ message: 'Requested item not found' });
});
