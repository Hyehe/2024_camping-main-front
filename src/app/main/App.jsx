"use client"; // Mark the component as a client-side component

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual"; // 필요한 스타일 추가
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded'; // 카테고리 아이콘
import DeckIcon from '@mui/icons-material/Deck'; // 카테고리 아이콘
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // 카테고리 아이콘
import FestivalIcon from '@mui/icons-material/Festival'; // 카테고리 아이콘
import { EffectFade, Navigation, Pagination, Autoplay, Virtual } from "swiper/modules";
import './styles.css';
import { useRouter } from "next/navigation";

export default function Main() {
    const [data, setData] = useState([]); // 캠핑장 데이터
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState(''); // 지역 선택 상태
    const [selectedCategory, setSelectedCategory] = useState(''); // 카테고리 선택 상태
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태
    const [swiperRef, setSwiperRef] = useState(null);
    const [showNavigation, setShowNavigation] = useState(false); // 네비게이션 버튼 상태
    const appendNumber = useRef(500);
    const prependNumber = useRef(1);
    const router = useRouter();

 // 상세 페이지로 이동
 const handleDetailClick = (contentId) => {
    router.push(`/campingdetail/${contentId}`); // 디테일 페이지로 이동
  };

    const regions = [
        "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
        "경기도", "강원", "충북", "충남", "전라북도", "전라남도",
        "경상북도", "경상남도", "제주도"
    ];

    const categories = [
        "카라반", "일반야영장", "자동차야영장", "글램핑"
    ];

    useEffect(() => {
        fetchCampData(); // 페이지 로드 시 캠핑장 데이터 가져오기
    }, []);

    const fetchCampData = async (region = "") => {
        try {
            const response = await fetch("http://localhost:8080/api/camping/sites");

            if (!response.ok) {
                throw new Error("네트워크 응답이 정상적이지 않습니다.");
            }

            const data = await response.json();
            setData(data); // 서버에서 받은 데이터를 상태에 저장
            setFilteredData(data); // 필터링된 데이터도 초기화
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = data.filter((item) => {
            const matchesRegion = selectedRegion ? item.addr1.includes(selectedRegion) : true;
            const matchesQuery = searchQuery ? item.facltNm.includes(searchQuery) : true;
            return matchesRegion && matchesQuery;
        });
        setFilteredData(filtered);
    };

    const handleCategoryClick = (category) => {
        if (category === "카라반") {
            const filtered = data.filter((item) => item.facltNm.includes(category) || item.addr1.includes(category));
            setFilteredData(filtered);
        } else {
            const filtered = data.filter((item) => item.facltNm.includes(category));
            setFilteredData(filtered);
        }
    };

    const prepend = () => {
        setSlides([ 
            `Slide ${prependNumber.current - 2}`,
            `Slide ${prependNumber.current - 1}`,
            ...slides,
        ]);
        prependNumber.current = prependNumber.current - 2;
        swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
    };

    const append = () => {
        setSlides([...slides, 'Slide ' + ++appendNumber.current]);
    };

    const slideTo = (index) => {
        swiperRef.slideTo(index - 1, 0);
    };

    return (
        <div className="outer-container"> {/* 전체 뒷 배경 */}
            <div className="slider-container">
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    navigation={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectFade, Navigation, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="slide-content">
                            <img src="./images/cam1.webp" alt="Slide 1" />
                            <div className="slide-text">Camplace: Where Gatherings Come to Life !</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-content">
                            <img src="./images/campingg2.jpg"  alt="Slide 2" />
                            <div className="slide-text">Camplace: Your Destination for Outdoor Memories !</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-content">
                            <img src="./images/campingg3.jpg"  alt="Slide 3" />
                            <div className="slide-text">Experience Togetherness at Camplace !</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search ..."
                    className="search-input"
                />
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="region-select"
                >
                    <option value="">region</option>
                    {regions.map((region, i) => (
                        <option key={i} value={region}>
                            {region}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                >
                    <option value="">category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <button type="submit" className="search-button">
                    search
                </button>
            </form>

            <div className="category-container">
                {categories.map((category, index) => (
                    <button 
                        key={index} 
                        className="category-button" 
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category === "카라반" ? (
                            <AirportShuttleRoundedIcon style={{ marginRight: "5px" }} />
                        ) : category === "일반야영장" ? (
                            <DeckIcon style={{ marginRight: "5px" }} />
                        ) : category === "자동차야영장" ? (
                            <LocalShippingIcon style={{ marginRight: "5px" }} />
                        ) : category === "글램핑" ? (
                            <FestivalIcon style={{ marginRight: "5px" }} />
                        ) : null}
                        {category}
                    </button>
                ))}
            </div>

            <div
                className="new-swiper-container"
                onMouseEnter={() => setShowNavigation(true)} // 마우스 진입 시 버튼 표시
                onMouseLeave={() => setShowNavigation(false)} // 마우스 나가면 버튼 숨김
            >
                <div className="month-text">경빈캠핑에 오신 것을 환영해요 !</div>
                <div className="additional-text">
                    12월에 이런 캠핑장 어떠세요 ?
                </div>

                <Swiper
                    modules={[Virtual, Navigation, Pagination]}
                    onSwiper={setSwiperRef}
                    slidesPerView={3}
                    centeredSlides={true}
                    spaceBetween={1}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={showNavigation}
                    virtual
                >
                    {filteredData && filteredData
                        .filter(item => item.induty.includes("카라반")) // '카라반'만 필터링
                        .map((item, index) => (
                            <SwiperSlide key={item.facltNm} virtualIndex={index}>
                                <div className="camping-slide">
                                    <img
                                         onClick={() => handleDetailClick(item.contentId)}
                                        src={item.firstImageUrl}
                                        alt={item.facltNm}
                                        className="camping-image"
                                    />
                                    <div className="image-overlay"></div>
                                    <h3>{item.facltNm}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}
