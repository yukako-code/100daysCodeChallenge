import React from 'react';
import type { Product } from '../type';


interface ProductListProps {
    products: Array<Product>
}
const ProductList: React.FC<ProductListProps> = ({ products }) => (
    <div>
        {
            products.map(({ id, title, image, description, category, price }) => (
                <div key={id} className='product'>
                    <img src={image} alt={title} className='product-img' />
                    <div className='product-top m8'>
                        <div className=''>
                            <h3>{title}</h3>
                            <p>{category}</p>
                        </div>
                        <div>{price}</div>
                    </div>
                    <p className='product-description'>{description}</p>

                </div>
            ))
        }
    </div>
)

export default React.memo(ProductList);