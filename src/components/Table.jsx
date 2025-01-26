// InventoryManagement.js
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import EditProductDialog from './EditProductDialog';

export default function InventoryManagement() {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : [
            { id: 1, name: 'Samsung Galaxy S21', price: 999.99, category: 'Electronics', quantity: 10 },
            { id: 2, name: 'Levi\'s 501 Jeans', price: 49.99, category: 'Clothing', quantity: 5 },
            { id: 3, name: 'The Great Gatsby - Hardcover', price: 19.99, category: 'Books', quantity: 0 },
            { id: 4, name: 'Sony WH-1000XM4 Headphones', price: 349.99, category: 'Electronics', quantity: 12 },
            { id: 5, name: 'Nike Air Max 90', price: 79.99, category: 'Clothing', quantity: 7 },
            { id: 6, name: '1984 by George Orwell', price: 15.99, category: 'Books', quantity: 20 },
            { id: 7, name: 'Ikea Hemnes TV Unit', price: 199.99, category: 'Furniture', quantity: 3 },
            { id: 8, name: 'Apple iPad Pro 11"', price: 1299.99, category: 'Electronics', quantity: 8 },
            { id: 9, name: 'Dyson V11 Vacuum Cleaner', price: 599.99, category: 'Appliances', quantity: 2 },
            { id: 10, name: 'Harry Potter and the Sorcerer\'s Stone', price: 9.99, category: 'Books', quantity: 15 },
            { id: 11, name: 'Adidas Ultraboost 21', price: 159.99, category: 'Clothing', quantity: 10 },
            { id: 12, name: 'West Elm Mid-Century Sofa', price: 849.99, category: 'Furniture', quantity: 5 },
            { id: 13, name: 'Cuisinart 14-Cup Food Processor', price: 89.99, category: 'Appliances', quantity: 6 },
            { id: 14, name: 'The Catcher in the Rye - Paperback', price: 22.99, category: 'Books', quantity: 8 },
            { id: 15, name: 'Bose QuietComfort 35 II', price: 279.99, category: 'Electronics', quantity: 3 },
            { id: 16, name: 'Patagonia Nano Puff Jacket', price: 159.99, category: 'Clothing', quantity: 12 },
            { id: 17, name: 'Sauder Entertainment Center', price: 109.99, category: 'Furniture', quantity: 7 },
            { id: 18, name: 'KitchenAid Stand Mixer', price: 499.99, category: 'Appliances', quantity: 1 },
            { id: 19, name: 'Canon EOS 90D DSLR Camera', price: 1299.99, category: 'Electronics', quantity: 4 },
            { id: 20, name: 'The Alchemist by Paulo Coelho', price: 39.99, category: 'Books', quantity: 18 },
            { id: 21, name: 'Tommy Hilfiger Polo Shirt', price: 69.99, category: 'Clothing', quantity: 9 },
            { id: 22, name: 'Sapiens: A Brief History of Humankind', price: 15.49, category: 'Books', quantity: 11 },
            { id: 23, name: 'Ashley Furniture Dining Set', price: 179.99, category: 'Furniture', quantity: 4 },
            { id: 24, name: 'Nespresso VertuoPlus Coffee Maker', price: 199.99, category: 'Appliances', quantity: 7 },
            { id: 25, name: 'GoPro Hero 9 Black', price: 399.99, category: 'Electronics', quantity: 10 },
            { id: 26, name: 'Beats by Dre Studio3 Wireless', price: 249.99, category: 'Electronics', quantity: 6 },
            { id: 27, name: 'Banana Republic Slim-Fit Chinos', price: 59.99, category: 'Clothing', quantity: 8 },
            { id: 28, name: 'Wayfair Upholstered Armchair', price: 169.99, category: 'Furniture', quantity: 2 },
            { id: 29, name: 'Ninja Professional Blender', price: 99.99, category: 'Appliances', quantity: 5 },
            { id: 30, name: 'Dell XPS 13 Laptop', price: 999.99, category: 'Electronics', quantity: 3 }
        ];
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState({ id: null, name: '', price: '', category: '', quantity: '' });
    const [submitted, setSubmitted] = useState(false);

    // Ensure that `updateInventoryStatus` is only setting state when necessary.
    useEffect(() => {
        setProducts(prevProducts =>
            prevProducts.map(product => {
                const updatedStatus = product.quantity > 10 ? 'INSTOCK' : product.quantity > 0 ? 'LOWSTOCK' : 'OUTOFSTOCK';
                // Only update if the status has changed
                if (product.inventoryStatus !== updatedStatus) {
                    return { ...product, inventoryStatus: updatedStatus };
                }
                return product;
            })
        );
    }, []);  // Notice the empty dependency array -> this runs only once, after initial render.

    const updateInventoryStatus = () => {
        setProducts(prevProducts =>
            prevProducts.map(product => ({
                ...product,
                inventoryStatus: product.quantity > 10 ? 'INSTOCK' : product.quantity > 0 ? 'LOWSTOCK' : 'OUTOFSTOCK'
            }))
        );
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let updatedProducts;

            if (product.id) {
                updatedProducts = products.map(p => p.id === product.id ? product : p);
            } else {
                product.id = createId();
                updatedProducts = [...products, product];
            }

            setProducts(updatedProducts);
            setProductDialog(false);
            setProduct({ id: null, name: '', price: '', category: '', quantity: '' });
        }
    };

    const createId = () => {
        return products.length ? Math.max(...products.map(product => product.id)) + 1 : 1;
    };

    const openNewProductDialog = () => {
        setProduct({ id: null, name: '', price: '', category: '', quantity: '' });
        setProductDialog(true);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = name === 'quantity' ? parseInt(val, 10) || 0 : val;

        setProduct(_product);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    const statusBodyTemplate = (product) => {
        return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
    };

    const quantityBodyTemplate = (product) => {
        return (
            <>
                <span>{product.quantity}</span>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" onClick={() => editProduct(product)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text" onClick={() => deleteProduct(product.id)} />
            </>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex justify-content-between ">
            <div className='p-mr-2 p-p-2'>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search " />
                <Button  label="Add Product" icon="pi pi-plus" onClick={openNewProductDialog} />
            </div>
            
        </div>
    );

    const footer = `In total there are ${products ? products.length : 0} products.`;

    return (
        <div className="card">
            <DataTable value={products} paginator rows={15} header={header} footer={footer} globalFilter={globalFilter}
                tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Name" sortable></Column>
                <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
                <Column field="category" header="Category" sortable></Column>
                <Column field="quantity" header="Quantity" body={quantityBodyTemplate} sortable></Column>
                <Column header="Status" body={statusBodyTemplate}></Column>
            </DataTable>
            <EditProductDialog
                visible={productDialog}
                product={product}
                onHide={hideDialog}
                onSave={saveProduct}
                onInputChange={onInputChange}
                submitted={submitted}
            />
        </div>
    );
}