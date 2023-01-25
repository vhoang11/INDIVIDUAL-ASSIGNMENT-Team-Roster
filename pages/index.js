import Head from 'next/head';
// import { useAuth } from '../utils/context/authContext';
import React from 'react';
// import '../styles/globals.css';
import YoutubeEmbed from '../components/YoutubeEmbed';

export default function App() {
  return (
    <div className="App" style={{ marginTop: '150px' }}>
      <Head>
        <title>Meet the Pups</title>
      </Head>
      <YoutubeEmbed embedId="fzZZJ3e9qDY" />
    </div>
  );
}
