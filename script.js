document.getElementById('invoice-form').addEventListener('submit', generateInvoice);
document.getElementById('add-product').addEventListener('click', addProduct);
document.getElementById('generate-pdf').addEventListener('click', generatePDF);
document.getElementById('share-whatsapp').addEventListener('click', shareViaWhatsApp);
document.getElementById('share-email').addEventListener('click', shareViaEmail);



function generateInvoice(e) {
    e.preventDefault();

    // Get input values
    const customerName = document.getElementById('customer-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const invoiceDate = document.getElementById('invoice-date').value;
    const discount = document.getElementById('discount').value / 100; // Convert to decimal

    // Get all product inputs
    const productElements = document.querySelectorAll('.product');
    const products = [];

    productElements.forEach((productElement, index) => {
        const itemName = productElement.querySelector('.item-name').value;
        const productType = productElement.querySelector('.product-type').value;
        const quantity = productElement.querySelector('.quantity').value;
        const price = productElement.querySelector('.price').value;
        const total = quantity * price;

        products.push({ serialNumber: index + 1, itemName, productType, quantity, price, total });
    });

    // Calculate the total amount before discount
    const totalAmountBeforeDiscount = products.reduce((sum, product) => sum + product.total, 0);

    // Calculate the total amount after discount
    const totalAmountAfterDiscount = totalAmountBeforeDiscount - (totalAmountBeforeDiscount * discount);

    // Generate invoice HTML
    const invoiceHTML = `
        <h2>Invoice</h2>
        <h3>Customer: ${customerName}</h3>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Invoice Date: ${invoiceDate}</p>
        <table>
            <tr>
                <th>Serial Number</th>
                <th>Item Name</th>
                <th>Product Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
            ${products
                .map(
                    (product) => `
                    <tr>
                        <td>${product.serialNumber}</td>
                        <td>${product.itemName}</td>
                        <td>${product.productType}</td>
                        <td>${product.quantity}</td>
                        <td>${product.price}</td>
                        <td>${product.total}</td>
                    </tr>
                `
                )
                .join('')}
            <tr>
                <td colspan="5" class="total-label">Total Amount Before Discount:</td>
                <td>${totalAmountBeforeDiscount}</td>
            </tr>
            <tr>
                <td colspan="5" class="total-label">Discount:</td>
                <td>${discount * 100}%</td>
            </tr>
            <tr>
                <td colspan="5" class="total-label">Total Amount After Discount:</td>
                <td>${totalAmountAfterDiscount}</td>
            </tr>
        </table>
    `;

    // Display the invoice
    const invoiceContainer = document.getElementById('invoice');
    invoiceContainer.innerHTML = invoiceHTML;
    invoiceContainer.style.display = 'block';

 
}






function addProduct() {
    const productsContainer = document.getElementById('products');

    const productElement = document.createElement('div');
    productElement.className = 'product';

    productElement.innerHTML = `
        <div class="form-group">
            <label for="item-name">Item Name:</label>
            <input type="text" class="item-name" required>
        </div>
        <div class="form-group">
            <label for="product-type">Product Type:</label>
            <input type="text" class="product-type" required>
        </div>
        <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input type="number" class="quantity" required>
        </div>
        <div class="form-group">
            <label for="price">Price:</label>
            <input type="number" class="price" required>
        </div>
    `;

    productsContainer.appendChild(productElement);
}





