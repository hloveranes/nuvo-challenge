import { useEffect, useState } from "react";

import { useProductContext } from "../../context/productContext";

const Product = () => {
  const theProductContext = useProductContext();

  useEffect(() => {
    theProductContext.getProduct(5);
  }, [])

  const handleDescription = (data) => {
    if(data.id == theProductContext.selected.id) {
      theProductContext.setSelected({})
    }else {
      theProductContext.setSelected(data)
    }
  }

  const isMatched = (isId) => {
    return theProductContext.selected.id === isId ? 'chevron-active' : 'chevron-inactive'
  }

  const handleAddToCart = () => {
    alert('add to cart');
  }


  const rates = (num) => {
    const tmpRate = theProductContext.selected?.rating?.rate;

    if(tmpRate <= 1 && num <= 1){ return true }
    if(tmpRate > 1 && num > 1 && tmpRate <= 2 && num <= 2){ return true }
    if(tmpRate > 2 && num > 2 && tmpRate <= 3 && num <= 3 ){ return true }
    if(tmpRate > 3 && num > 3 && tmpRate <= 4 && num <= 4 ){ return true }
    if(tmpRate > 4 && num > 4 && tmpRate <= 5 && num <= 5 ){ return true }
  }


  const product = () => {
    const products = theProductContext.productList;
    return (
      products.map(item => {
        return (
          <div 
            onClick={(e) => handleDescription(item)}
            key={item.id} 
            className="product-list"
          >
            <img src={item.image} alt={item.id} />
            <p>{item.title}</p>
            <span className="chevron-container">
              <i className={`chevron ${isMatched(item.id)}`}></i>
            </span>
          </div>
        )
      })
    )
  }


  return (
    <div>
      <div className="product-title txt-center"> 
        <h1>Product page</h1>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis 
          architecto neque illum eius error, totam mollitia reiciendis officiis quis 
          magnam?
        </div>
      </div>
      <div className="product-frame">
        <div className="w-6-12 product-container">
          {product()}
        </div>
        {theProductContext?.selected?.id && <div className="w-6-12 product-details">
          <div>
            <div className="price">$ {theProductContext.selected?.price}</div>
            <div>{theProductContext.selected?.description}</div>
            <div className="ratings">
              <div className="rate">
                <input type="radio" id="star5" name="rate" value="5" defaultChecked={ rates(5) } />
                <label htmlFor="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value="4" defaultChecked={ rates(4) }/>
                <label htmlFor="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value="3" defaultChecked={ rates(3) }/>
                <label htmlFor="star3" title="text">3 stars</label>
                <input type="radio" id="star2" name="rate" value="2" defaultChecked={ rates(2) }/>
                <label htmlFor="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value="1" defaultChecked={ rates(1) }/>
                <label htmlFor="star1" title="text">1 star</label>
              </div>
              <div className="count">
                ({theProductContext.selected?.rating?.count})</div>
              </div>
            <div>
              <button onClick={handleAddToCart}>Add to cart</button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Product;