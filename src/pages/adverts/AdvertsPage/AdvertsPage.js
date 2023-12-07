import React, { useEffect, useState } from 'react';
import { getAds } from '../service';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout';
import Ad from '../components/ad';


import '../../../styles/components.css';
import '../../../styles/404.css';

function AdvertsPage() {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('todos');
  const navigate = useNavigate(); 

const EmptyList = () => (
  <div className='page'>
    <span className="adsNotFound">
        <h2><span className="errorText">No hay anuncios para mostrar</span></h2>
    </span>
  </div>
);

const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
};

const handleTransactionFilterChange = (event) => {
    setTransactionFilter(event.target.value);
};

const handleApplyFilters = () => {
    const filtered = ads.filter((ad) => {
      const nameMatches = ad.name.toLowerCase().includes(nameFilter.toLowerCase());
      const transactionMatches =
        transactionFilter === 'todos' ||
        (transactionFilter === 'venta' && ad.sale) ||
        (transactionFilter === 'compra' && !ad.sale);
  
      return nameMatches && transactionMatches;
    });
    setFilteredAds(filtered);
};

const handleDeleteFilters = () => {
  setFilteredAds(ads);
};

  useEffect(() => {
    getAds().then((ads) => {
      setAds(ads);
      setFilteredAds(ads);
    });
  }, []);

  return (
    <Layout>
      <div className='page'>
        {filteredAds.length > 0 && (
          <table className='content-table'>
            <tbody>
              <tr>
                <td className='filter-cell'>
                  <div className='filter-container'>
                    <label>
                      Nombre:
                      <input type='text' value={nameFilter} onChange={handleNameFilterChange} className='formElement' />
                    </label>
                    <label>
                      Compra/Venta:
                      <select value={transactionFilter} onChange={handleTransactionFilterChange} className='formElement'>
                        <option value='todos'>Todos</option>
                        <option value='venta'>Venta</option>
                        <option value='compra'>Compra</option>
                      </select>
                    </label>
                    <button type='button' onClick={handleApplyFilters} className='submit longButton'>Aplicar Filtros</button>
                    <button type='button' onClick={handleDeleteFilters} className='submit longButton'>Borrar Filtros</button>
                  </div>
                </td>
                <td className='ad-list-cell'>
                  <ul className='adList'>
                    {filteredAds.map(({ id, ...ad }) => (
                      <li key={id}>
                        <Link to={`${id}`} className='ad'>
                          <Ad {...ad} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        )}
  
        {filteredAds.length === 0 && (
          <EmptyList />
        )}
      </div>
    </Layout>
  ); 
}

export default AdvertsPage;
