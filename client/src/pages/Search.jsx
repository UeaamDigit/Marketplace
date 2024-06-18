import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

import h2 from '../images/h2.avif';
import h3 from '../images/h3.avif';
import h4 from '../images/h4.avif';
import h5 from '../images/h5.avif';
import h6 from '../images/h6.avif';
import h7 from '../images/h7.avif';
import ListingItem from '../components/ListingItem';
import h1 from '../images/h1.webp';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link>
              <img
                src={h1}
                alt='listing cover'
                className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
              />
              <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>
                  Modern house interior
                </p>
                <div className='flex items-center gap-1'>
                  <MdLocationOn className='h-4 w-4 text-green-700' />
                  <p className='text-sm text-gray-600 truncate w-full'>
                    İstanbul, Turkey
                  </p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>
                  Interior of classic contemporary style, leather sofa set
                </p>
                <p className='text-slate-500 mt-2 font-semibold '>
                  $330/Month
                </p>
                <div className='text-slate-700 flex gap-4'>
                  <div className='font-bold text-xs'>
                    6bets
                  </div>
                  <div className='font-bold text-xs'>
                    5 baths
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link>
              <img
                src={h7}
                alt='listing cover'
                className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
              />
              <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>
                  Modern living room
                </p>
                <div className='flex items-center gap-1'>
                  <MdLocationOn className='h-4 w-4 text-green-700' />
                  <p className='text-sm text-gray-600 truncate w-full'>
                    Mercer Island, WA, USA
                  </p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>

                  February 17, 2021, Architecture & Interiors, Interiors
                </p>
                <p className='text-slate-500 mt-2 font-semibold '>
                  $750/Month
                </p>
                <div className='text-slate-700 flex gap-4'>
                  <div className='font-bold text-xs'>
                    6 Bets
                  </div>
                  <div className='font-bold text-xs'>
                    5 Baths
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link>
              <img
                src={h3}
                alt='listing cover'
                className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
              />
              <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>
                  Green room
                </p>
                <div className='flex items-center gap-1'>
                  <MdLocationOn className='h-4 w-4 text-green-700' />
                  <p className='text-sm text-gray-600 truncate w-full'>
                    Kuala Lumpur, Federal Territory of Kuala Lumpur, M
                  </p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>
                  The famous sky pool in Kuala Lumpur with a stunning view of the skyline
                </p>
                <p className='text-slate-500 mt-2 font-semibold '>
                  $200/Month
                </p>
                <div className='text-slate-700 flex gap-4'>
                  <div className='font-bold text-xs'>
                    3bets
                  </div>
                  <div className='font-bold text-xs'>
                    2baths
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link>
              <img
                src={h6}
                alt='listing cover'
                className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
              />
              <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>
                  iving room
                </p>
                <div className='flex items-center gap-1'>
                  <MdLocationOn className='h-4 w-4 text-green-700' />
                  <p className='text-sm text-gray-600 truncate w-full'>
                    London, UK
                  </p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>
                  Interior design series
                </p>
                <p className='text-slate-500 mt-2 font-semibold '>
                  $300/Month
                </p>
                <div className='text-slate-700 flex gap-4'>
                  <div className='font-bold text-xs'>
                    6bets
                  </div>
                  <div className='font-bold text-xs'>
                    5 baths
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link>
              <img
                src={h4}
                alt='listing cover'
                className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
              />
              <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>
                  Luxurious Villa
                </p>
                <div className='flex items-center gap-1'>
                  <MdLocationOn className='h-4 w-4 text-green-700' />
                  <p className='text-sm text-gray-600 truncate w-full'>
                    The ninteen th floor
                  </p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>
                  Modern Luxurious Villa with palms garden.
                </p>
                <p className='text-slate-500 mt-2 font-semibold '>
                  $400/Month
                </p>
                <div className='text-slate-700 flex gap-4'>
                  <div className='font-bold text-xs'>
                    6bets
                  </div>
                  <div className='font-bold text-xs'>
                    4 baths
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link>
              <img
                src={h5}
                alt='listing cover'
                className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
              />
              <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>
                  Lounge-Area and Cityscape
                </p>
                <div className='flex items-center gap-1'>
                  <MdLocationOn className='h-4 w-4 text-green-700' />
                  <p className='text-sm text-gray-600 truncate w-full'>
                    Hanoi, Vietnam
                  </p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>
                  Interior of reception co sharing office cafe area lot in day time
                </p>
                <p className='text-slate-500 mt-2 font-semibold '>
                  $600/Month
                </p>
                <div className='text-slate-700 flex gap-4'>
                  <div className='font-bold text-xs'>
                    6bets
                  </div>
                  <div className='font-bold text-xs'>
                    5 baths
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
