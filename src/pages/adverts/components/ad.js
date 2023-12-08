import React from 'react';
import PropTypes from 'prop-types';

import '../../../styles/components.css';

const Ad = ({ name, sale, price, tags}) => {
  return (
    <article className="ad">
        <div>
            <p><b>Nombre: </b>{name}</p>
            <p><b>Transacción: </b>{sale ? 'Venta' : 'Compra'}</p> 
            <p><b>Precio: </b>{price}</p>
            <p><b>Tags: </b> {tags.join(', ')}</p>
        </div>
    </article>
  );
};

Ad.propTypes = {
  name: PropTypes.string.isRequired,
  sale: PropTypes.any.isRequired,
  price: PropTypes.number,
  tags: PropTypes.array.isRequired
}

export default Ad;