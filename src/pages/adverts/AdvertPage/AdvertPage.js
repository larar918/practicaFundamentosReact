import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { deleteAd, getAd } from '../service';
import Layout from '../../../components/Layout';
import ButtonConfirm from '../components/buttonConfirm';

import '../../../styles/components.css'


function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);

  
  const handleDeleteAd = async event => {
    event.preventDefault();
    await deleteAd(params.id);
    navigate('/adverts');
  }

  useEffect(() => {
    getAd(params.id)
      .then(ad => setAd(ad))
      .catch(error => {
        if (error.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate, params.id])


  return (
    <Layout>
      <div className="ad-detail-container">
        {ad && (
          <article className="ad-detail ad">
            <div>
              <p><b>Nombre: </b>{ad.name}</p>
              <p><b>Transacción: </b>{ad.sale ? 'Venta' : 'Compra'}</p> 
              <p><b>Precio: </b>{ad.price}</p>
              <p><b>Tags: </b> {ad.tags.join(', ')}</p>
              {ad.photo !== null && <p><b>Foto: </b> {ad.photo}</p>} 
            </div>
          </article>
        )}
        <ButtonConfirm onDelete={handleDeleteAd} />
      </div>
    </Layout>
  );
}

export default AdvertPage;

