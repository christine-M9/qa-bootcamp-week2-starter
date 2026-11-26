import { test, expect } from '@playwright/test';

// The full API address.
const API_URL = 'https://api.practicesoftwaretesting.com';

// The cart each test creates, so we can delete it afterwards.
let cartId: string | undefined;

// Clean up: delete the cart the test created.
test.afterEach(async ({ request }) => {
  if (cartId) {
    const response = await request.delete(`${API_URL}/carts/${cartId}`);
    expect(response.status()).toBe(204);
    cartId = undefined;
  }
});

// Create a cart, add 2 Pliers, then check the cart holds them.
test('create a cart and add a product', async ({ request }) => {
  // Find the Pliers id by name, because ids change when the site resets.
  const search = await request.get(`${API_URL}/products/search`, { params: { q: 'pliers' } });
  expect(search.status()).toBe(200);
  const results = await search.json();
  const pliers = results.data.find((product: { name: string }) => product.name === 'Pliers');
  expect(pliers).toBeDefined();

  // Create the cart.
  const created = await request.post(`${API_URL}/carts`);
  expect(created.status()).toBe(201);
  const cart = await created.json();
  expect(cart.id).toBeTruthy();
  cartId = cart.id;

  // Add 2 Pliers to it.
  const added = await request.post(`${API_URL}/carts/${cartId}`, {
    data: { product_id: pliers.id, quantity: 2 },
  });
  expect(added.status()).toBe(200);
  expect(await added.json()).toEqual({ result: 'item added or updated' });

  // Read the cart back and check its fields.
  const fetched = await request.get(`${API_URL}/carts/${cartId}`);
  expect(fetched.status()).toBe(200);
  const body = await fetched.json();
  expect(body.id).toBe(cartId);
  expect(body.cart_items).toHaveLength(1);
  expect(body.cart_items[0].quantity).toBe(2);
  expect(body.cart_items[0].product_id).toBe(pliers.id);
  expect(body.cart_items[0].product.name).toBe('Pliers');
  expect(body.cart_items[0].product.price).toBe(pliers.price);
});

// Ask for a cart that does not exist and check for a 404.
test('a cart id that does not exist returns 404', async ({ request }) => {
  const response = await request.get(`${API_URL}/carts/01jnocartwiththisid000000`);
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ message: 'Requested item not found' });
});
