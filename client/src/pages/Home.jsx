import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdLocationOn } from 'react-icons/md';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import h1 from '../images/h1.webp';
import h2 from '../images/h2.avif';
import h3 from '../images/h3.avif';
import h4 from '../images/h4.avif';
import h5 from '../images/h5.avif';
import h6 from '../images/h6.avif';
import h7 from '../images/h7.avif';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Wiam Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>

        <SwiperSlide>
          <div
            style={{
              background: `url(${h2}) center no-repeat`,
              backgroundSize: 'cover',
            }}
            className='h-[500px]'
          ></div>
        </SwiperSlide>

      </Swiper>



      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>

        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
            <Link className='text-sm text-blue-800 hover:underline' >Show more offers</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
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
    </div>
  );
}
