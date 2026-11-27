import { test, expect, APIRequestContext } from '@playwright/test';

test.use({
  baseURL: process.env.TOOLSHOP_API_URL ?? 'https://api.practicesoftwaretesting.com',
  // Without this header the API sends a redirect instead of 422.
  extraHTTPHeaders: { Accept: 'application/json' },
});

let cartId: string | undefined;

// Product ids change when the site resets, so look the product up by name.
async function findProductId(request: APIRequestContext, name: string) {
  const response = await request.get('/products/search', { params: { q: name } });
  expect(response.status()).toBe(200);
  const product = (await response.json()).data.find((item: { name: string }) => item.name === name);
  expect(product).toBeDefined();
  return product.id;
}

// Delete the cart after the test, even if the test failed.
test.afterEach(async ({ request }) => {
  if (cartId) {
    const response = await request.delete(`/carts/${cartId}`);
    cartId = undefined;
    expect(response.status()).toBe(204);
  }
});

test('C6 Missing quantity', async ({ request }) => {
  const productId = await findProductId(request, 'Combination Pliers');

  const created = await request.post('/carts');
  expect(created.status()).toBe(201);
  cartId = (await created.json()).id;

  // Add the product without a quantity.
  const added = await request.post(`/carts/${cartId}`, { data: { product_id: productId } });
  expect(added.status()).toBe(422);

  // A bad product id also gives 422, so check the error is only about quantity.
  expect((await added.json()).errors).toEqual({ quantity: ['The quantity field is required.'] });

  // Nothing was added to the cart.
  const cart = await request.get(`/carts/${cartId}`);
  expect((await cart.json()).cart_items).toEqual([]);
});
