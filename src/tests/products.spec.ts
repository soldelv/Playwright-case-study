import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { ProductsPage } from '../pages/productsPage'

test.describe('Products Page Suite', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.navigate()
        await loginPage.login('standard_user', 'secret_sauce')
    });

    test('each products should display title, description and cart button', async ({page}) => {
        const productPage = new ProductsPage(page)
        expect(await productPage.checkElementsDisplayedForEachProduct()).toBeTruthy()
    });

    test('verify after click on add to cart, remove button is displayed instead', async ({page}) => {
        const productPage = new ProductsPage(page)
        await productPage.addNProductsToCart(2)
        expect(await productPage.checkRemoveButtonIsDisplayedInFirstNProducts(2)).toBeTruthy()
    });

    test('verify cart icon contains number of products selected', async ({page}) => {
        const productPage = new ProductsPage(page)
        await productPage.addNProductsToCart(2)
        expect(await productPage.checkCartIconContainsProductsSelected(2)).toBeTruthy()
    });

    test('verify cart icon number is updated when remove a product from inventory', async ({page}) => {
        const productPage = new ProductsPage(page)

        await productPage.addNProductsToCart(3)
        expect(await productPage.checkCartIconContainsProductsSelected(3)).toBeTruthy()

        await productPage.removeNProductsFromCart(1)
        expect(await productPage.checkCartIconContainsProductsSelected(2)).toBeTruthy()
    });

});

