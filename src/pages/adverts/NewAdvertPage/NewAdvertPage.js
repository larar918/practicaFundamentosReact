import { useState } from 'react';
import { createAd } from '../service';
import { useNavigate } from 'react-router';
import Layout from '../../../components/Layout';

import '../../../styles/forms.css';

function NewAdvertPage() {
  const [content, setContent] = useState({
    name: '',
    sale: true,
    price: parseFloat(0),
    tags: [],
    photo: null,
  });

  // Destructuring para usarlo sin poner content.advert_name, content.sale, etc.
  const { name, sale, price, tags, photo } = content;
  const disabled = !(name && sale && price && tags.length !== 0);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setContent((currentContent) => ({
      ...currentContent,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTagsChange = (event) => {
    const { name, checked } = event.target;

    // Actualiza el estado de los tags según la casilla de verificación seleccionada/deseleccionada. 
    if (checked) {
      setContent((prevContent) => ({
        ...prevContent,
        tags: [...prevContent.tags, name],
      }));
    } else {
      setContent((prevContent) => ({
        ...prevContent,
        tags: prevContent.tags.filter((tag) => tag !== name),
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setContent((currentContent) => ({
      ...currentContent,
      photo: file,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    tags.forEach((tag) => {
      formData.append('tags', tag);
    });
    formData.append('price', price);
   
    if (photo) {
      formData.append('photo', photo);
    }
  
    const ad = await createAd(formData);
    navigate(`../${ad.id}`, { relative: 'path' });
  };

  return (
    <Layout>
      <div className="page">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>Nombre: </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className="formElement"
            />
            <br></br>
            <label>Transacción: </label>
            <select
              name="sale"
              onChange={handleChange}
              className="formElement"
            >
              <option value={true}>Venta</option>
              <option value={false}>Compra</option>
            </select>
            <label>Precio: </label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
              className="formElement"
            />
            <label>Tags: </label>
            <div className="checkElement">
              <input
                type="checkbox"
                name="lyfestyle"
                checked={tags.includes('lyfestyle')}
                onChange={handleTagsChange}
                className="formCheck"
              />{' '}
              <p className="formatCheckTarget">Lyfestyle</p>
            </div>
            <div className="checkElement">
              <input
                type="checkbox"
                name="mobile"
                checked={tags.includes('mobile')}
                onChange={handleTagsChange}
                className="formCheck"
              />{' '}
              <p className="formatCheckTarget">Mobile</p>
            </div>
            <div className="checkElement">
              <input
                type="checkbox"
                name="motor"
                checked={tags.includes('motor')}
                onChange={handleTagsChange}
                className="formCheck"
              />{' '}
              <p className="formatCheckTarget">Motor</p>
            </div>
            <div className="checkElement">
              <input
                type="checkbox"
                name="work"
                checked={tags.includes('work')}
                onChange={handleTagsChange}
                className="formCheck"
              />{' '}
              <p className="formatCheckTarget">Work</p>
            </div>
            <br></br>
            <label>Photo: </label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="formElement"
            />
            <br></br>
          </fieldset>
          <button type="submit" className="submit" disabled={disabled}>Crear Anuncio</button>
        </form>
      </div>
    </Layout>
  );
}

export default NewAdvertPage;
