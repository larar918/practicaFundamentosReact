import client from '../../api/client';


const adsUrl = '/v1/adverts';

export const getAds = () => {
  const url = `${adsUrl}`;
  return client.get(url);
};

export const getAd = adId => {
  const url = `${adsUrl}/${adId}`;
  return client.get(url);
};

export const createAd = ad => {
  const url = adsUrl;
  return client.post(url, ad);
};

export const deleteAd = adId => {
  const url = `${adsUrl}/${adId}`;
  return client.delete(url);
};

