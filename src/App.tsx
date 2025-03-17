import React from 'react';
import HomePage from './screen/homePage';
import PostPage from './screen/postPage';
import MemberPage from './screen/memberPage';
import { Route, Routes } from 'react-router-dom';
import "swiper/css"
import "swiper/css/navigation"
import "./scss/mobile/main.scss"
import 'swiper/css/pagination';
import "./scss/pc/main.scss"
import "./scss/general.scss"
import OtherMember from './screen/memberPage/otherMember';
import BasicLayout from './components/layouts/basicLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/posts' element={<BasicLayout Component={PostPage} />} />
        <Route path='/member/:id' element={<BasicLayout Component={OtherMember} />} />
        <Route path='/my-page' element={<BasicLayout Component={MemberPage} />} />
        <Route path='/' element={<BasicLayout Component={HomePage} />} />
      </Routes>
    </>
  );
}

export default App;
