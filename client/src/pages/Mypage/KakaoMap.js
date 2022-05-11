/*global kakao*/
import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { TransContainer, UDContainer } from '../../components/Container';

function KakaoMap() {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        position => {
          setState(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        err => {
          setState(prev => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState(prev => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  const [info, setInfo] = useState();
  const [pages, setPages] = useState([]);
  const [pageInfo, setPageInfo] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  useEffect(() => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let x = position.coords.longitude;
        let y = position.coords.latitude;
        console.log(x, y);
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(
          '꽃집',
          (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              const bounds = new kakao.maps.LatLngBounds();
              console.log(_pagination, '페이지 정보');
              let pageNums = [];
              for (let i = 1; i <= _pagination.last; i++) {
                pageNums.push(i);
              }
              let dataList = [];
              let markers = [];

              for (let i = 0; i < data.length; i++) {
                //검색 결과 목록
                dataList.push({
                  idx: i,
                  data: data[i],
                });

                //지도상 좌표 목록
                markers.push({
                  position: {
                    lat: data[i].y,
                    lng: data[i].x,
                  },
                  content: data[i].place_name,
                });
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }
              setPages(pageNums);
              setPageInfo(_pagination);
              setDataList(dataList);
              setMarkers(markers);

              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
              map.setBounds(bounds);
            }
          },
          { x, y, radius: 2000 },
        );
      });
    }
  }, [map]);

  //마커 이미지
  const currentMarkerImage = {
    src: '../../images/current.png',
    size: { width: 30, height: 33 },
    //options: { offset: new kakao.maps.Point(13, 13) },
  };
  const StoreMarkerImage = {
    src: '../../images/namu.png',
    size: { width: 25, height: 25 },
    options: { offset: new kakao.maps.Point(13, 13) },
  };

  return (
    <>
      <UDContainer>
        <TransContainer>
          <div>
            <h2>내 주변 꽃집 찾기</h2>
            {/* 지도 Container */}
            <Map
              center={state.center}
              style={{
                width: '30rem',
                height: '30rem',
                border: '1rem red',
              }}
              level={3}
              onCreate={setMap}
            >
              {/* 현재 위치 마커 */}
              {!state.isLoading && (
                <MapMarker position={state.center} image={currentMarkerImage} />
              )}
              {/* 꽃집 위치 */}
              {markers.map(marker => (
                <>
                  {/* 말풍선 */}
                  <CustomOverlayMap
                    position={marker.position}
                    content={marker.content}
                  >
                    {/* 마커 */}
                    <MapMarker
                      key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                      position={marker.position}
                      onMouseOver={() => setInfo(marker)}
                      onMouseOut={() => setInfo()}
                      image={StoreMarkerImage}
                    ></MapMarker>
                    {info && info.content === marker.content && (
                      <MarkerBubble>{marker.content}</MarkerBubble>
                    )}
                  </CustomOverlayMap>
                </>
              ))}
            </Map>
          </div>

          <div>
            {/* 검색결과 리스트 */}
            <div
              style={{
                margin: '4.4rem 2rem 0rem 2rem',
                border: '0.2rem solid #bcbcbc',
                width: '20rem',
                height: '30rem',
                overflow: 'auto',
              }}
            >
              <ul style={{ padding: '0 1rem' }}>
                {dataList.map(item => {
                  return (
                    <Storeli
                      key={item.id}
                      onMouseOver={() => {
                        setInfo({
                          position: {
                            lat: item.data.y,
                            lng: item.data.x,
                          },
                          content: item.data.place_name,
                        });
                      }}
                      onMouseOut={() => {
                        setInfo();
                      }}
                    >
                      <h4 style={{ marginBottom: '0rem ' }}>
                        {item.data.place_name}
                      </h4>
                      {item.data.road_address_name ? (
                        <div>{item.data.road_address_name}</div>
                      ) : null}
                      <div>{item.data.address_name}</div>
                      <div>{item.data.phone}</div>
                    </Storeli>
                  );
                })}
              </ul>
            </div>
            {/* 페이지 번호 */}
            <Pageul>
              {pages.map((page, idx) => {
                return idx + 1 === pageInfo.current ? (
                  <a key={idx}>
                    <Pageli style={{ color: 'black' }}>{page}</Pageli>
                  </a>
                ) : (
                  <a
                    key={idx}
                    onClick={(page => {
                      return () => pageInfo.gotoPage(page);
                    })(page)}
                  >
                    <Pageli>{page}</Pageli>
                  </a>
                );
              })}
            </Pageul>
          </div>
        </TransContainer>
      </UDContainer>
    </>
  );
}

export default KakaoMap;

const MarkerBubble = styled.div`
  position: absolute;
  z-index: 999;
  top: -2rem;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 0.15rem;
  font-weight: 600;
  color: white;
  background-color: #3ba914;
`;

const Storeli = styled.li`
  list-style: none;
  :hover {
    background-color: #bcbcbc;
  }
`;
const Pageul = styled.ul`
  padding-left: 0;
  text-align: center;
  list-style: none;
`;
const Pageli = styled.li`
  display: inline-block;
  padding: 0 1rem;
  list-style: none;
  color: #bcbcbc;
  cursor: pointer;
`;
