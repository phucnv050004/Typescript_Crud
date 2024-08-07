import React from 'react'
import { TProduct } from '../interfaces/TProducts'
import { Link } from 'react-router-dom';

type Props = {
    products : TProduct[];
}

const ProductPage: React.FC<Props> = ({products}) => {
  return (
    <div className="container">
      <div className="row gx-5">
        {products.map((item) => (
          <div
            key={item.id}
            className="col col-sm-12 col-md-6 col-lg-4 col-xl-3 "
          >
            <div className="product-card">
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="product-image"
                />
              </Link>
              <div className="product-content">
                <Link to={`/products/${item.id}`}>
                  <h2>{item.title}</h2>
                </Link>
                <p>{item.price}</p>
                <p>{item.description}</p>
                <button className="btn btn-primary">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPage