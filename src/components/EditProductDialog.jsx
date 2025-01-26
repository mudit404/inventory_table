import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const EditProductDialog = ({ visible, product, onHide, onSave, onInputChange, submitted }) => {
    return (
        <Dialog visible={visible} style={{ width: '450px' }} header="Product Details" modal className="p-fluid dialog"
            footer={
                <>
                    <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text dialog-button" />
                    <Button label="Save" icon="pi pi-check" onClick={onSave} className="p-button-text dialog-button" />
                </>
            }
            onHide={onHide}
            dismissableMask
            >
            <div className="field">
                <label htmlFor="name">Name</label>
                <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus
                    className={submitted && !product.name ? 'p-invalid' : ''} />
                {submitted && !product.name && <small className="p-error">Name is required.</small>}
            </div>

            <div className="field">
                <label htmlFor="category">Category</label>
                <InputText id="category" value={product.category} onChange={(e) => onInputChange(e, 'category')} required
                    className={submitted && !product.category ? 'p-invalid' : ''} />
                {submitted && !product.category && <small className="p-error">Category is required.</small>}
            </div>

            <div className="field">
                <label htmlFor="price">Price</label>
                <InputText id="price" value={product.price} onChange={(e) => onInputChange(e, 'price')} required
                    className={submitted && !product.price ? 'p-invalid' : ''} />
                {submitted && !product.price && <small className="p-error">Price is required.</small>}
            </div>

            <div className="field">
                <label htmlFor="quantity">Quantity</label>
                <InputText id="quantity" value={product.quantity} onChange={(e) => onInputChange(e, 'quantity')} required
                    className={submitted && product.quantity < 0 ? 'p-invalid' : ''} />
                {submitted && product.quantity < 0 && <small className="p-error">Quantity must be 0 or more.</small>}
            </div>
        </Dialog>
    );
};

export default EditProductDialog;