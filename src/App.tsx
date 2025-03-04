import React from 'react';
import HomePage from './screen/homePage';
import PostPage from './screen/postPage';
import MemberPage from './screen/memberPage';
import { Route, Routes } from 'react-router-dom';
import "swiper/css"
import "swiper/css/navigation"
import "./scss/mobile/main.scss"
import "./scss/pc/main.scss"
import "./scss/general.scss"

function App() {
  return (
    <>
      <Routes>
        <Route path='/posts' element={<PostPage />} />
        <Route path='/memberpage' element={<MemberPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
