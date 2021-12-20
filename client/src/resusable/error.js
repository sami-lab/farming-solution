import React from 'react';

import Link from 'next/link';
export default function Error(props) {
  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              fontWeight: '900',
              backgroundImage: 'url(/dev/error.jpg)',
              backgroundRepeat: 'repeat',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            id="heading"
          >
            Oops!
          </h1>

          <h2
            style={{
              fontFamily: 'Montserrat',
              color: '#000',
              fontSize: '1.5rem',
              fontWeight: '700',
              textTransform: 'uppercase',
            }}
          >
            {props.message}
          </h2>

          <Link href="/dashboard">
            <a
              style={{
                fontFamily: 'Montserrat',
                fontSize: '14px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                background: '#0046d5',
                display: 'inline-block',
                padding: '15px 30px',
                borderRadius: '40px',
                color: '#fff',
                fontWeight: 700,
                WebkitBoxShadow: '0px 4px 15px -5px #0046d5',
                boxShadow: '0px 4px 15px -5px #0046d5',
                marginTop: '10px',
              }}
            >
              {' '}
              Go To Homepage
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        #heading {
          font-size: 15rem;
          height: 25rem;
        }
        @media only screen and (max-width: 767px) {
          #heading {
            font-size: 10rem;
            height: 20rem;
          }
        }
      `}</style>
    </div>
  );
}
