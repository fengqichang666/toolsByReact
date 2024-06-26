import { useEffect, useState } from 'react';
import styles from './MapContainer.css?inline';
import AMapLoader from '@amap/amap-jsapi-loader';

export default function MapContainer() {
    let map: any = null;
    const [location, setLocation] = useState([105.602725, 37.076636]);
    const getGeolocation = (aMap: any) => {
        var geolocation = new aMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认：true
            timeout: 10000, // 设置定位超时时间，默认：无穷大
            offset: [10, 20],  // 定位按钮的停靠位置的偏移量
            zoomToAccuracy: false,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            position: 'RB' //  定位按钮的排放位置,  RB表示右下
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status: string, result: any) {
            if (status == 'complete') {
                onComplete(result);
            } else {
                onError();
            }
        });

    };

    function onComplete(data: any) {
        // data是具体的定位信息
        setLocation([data.position.lng, data.position.lat]);
    }

    function onError() {
        // 定位出错
    }

    let position: any = null;
// IP定位获取当前城市信息
    const getCitySearch = (AMap: any, map: any) => {
        const citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(
            status: string,
            result: {
                city: string;
                info: string;
            }
        ) {
            if (status === 'complete' && result.info === 'OK') {
                console.log(
                    '🚀 ~ file: map-container.vue:88 ~ getCitySearch ~ result:',
                    result
                );
                // 查询成功，result即为当前所在城市信息
                getWeather(AMap, map, result.city);
            }
        });
    };
    const getWeather = (AMap: any, map: any, city: string) => {
        const weather = new AMap.Weather();
        weather.getLive(
            city,
            function(
                err: any,
                data: {
                    city: string;
                    weather: string;
                    temperature: string;
                    windDirection: string;
                    windPower: string;
                    humidity: string;
                    reportTime: string;
                }
            ) {
                if (!err) {
                    const str = [];
                    str.push('<h4 >实时天气' + '</h4><hr>');
                    str.push('<p>城市/区：' + data.city + '</p>');
                    str.push('<p>天气：' + data.weather + '</p>');
                    str.push('<p>温度：' + data.temperature + '℃</p>');
                    str.push('<p>风向：' + data.windDirection + '</p>');
                    str.push('<p>风力：' + data.windPower + ' 级</p>');
                    str.push('<p>空气湿度：' + data.humidity + '</p>');
                    str.push('<p>发布时间：' + data.reportTime + '</p>');
                    const marker = new AMap.Marker({
                        map: map,
                        position: position || map.getCenter()
                    });
                    const infoWin = new AMap.InfoWindow({
                        content:
                            '<div class="info" style="position:inherit;margin-bottom:0;background:#ffffff90;padding:10px">' +
                            str.join('') +
                            '</div><div class="sharp"></div>',
                        isCustom: true,
                        offset: new AMap.Pixel(0, -37)
                    });
                    infoWin.open(map, marker.getPosition());
                    marker.on('mouseover', function() {
                        infoWin.open(map, marker.getPosition());
                    });
                }
            }
        );
        // 未来4天天气预报
        weather.getForecast(
            city,
            function(err: any, data: { forecasts: string | any[] }) {
                console.log(
                    '🚀 ~ file: map-container.vue:186 ~ getWeather ~ data:',
                    data
                );

                if (err) {
                    return;
                }
                var strs = [];
                for (var i = 0, dayWeather; i < data.forecasts.length; i++) {
                    dayWeather = data.forecasts[i];
                    strs.push(
                        `<p>${dayWeather.date}&nbsp&nbsp${dayWeather.dayWeather}&nbsp&nbsp${dayWeather.nightTemp}~${dayWeather.dayTemp}℃</p><br />`
                    );
                }
            }
        );

    };

    const createdMap = () => {
        // @ts-ignore
        window._AMapSecurityConfig = {
            securityJsCode: '81f688e2270e5858205f61964b941e4d'
        };
        AMapLoader.load({
            key: '366703334c8461e68a2f7b8c29346fbd', // 申请好的Web端开发者Key，首次调用 load 时必填
            version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [
                'AMap.ToolBar',
                'AMap.Scale',
                'AMap.HawkEye',
                'AMap.MapType',
                'AMap.Geolocation',
                'AMap.Geocoder',
                'AMap.Weather',
                'AMap.CitySearch',
                'AMap.InfoWindow',
                'AMap.Marker',
                'AMap.Pixel'
            ] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        }).then(AMap => {
            console.log(location);
            map = new AMap.Map('container', {
                // 设置地图容器id
                resizeEnable: true,
                viewMode: '3D', // 是否为3D地图模式
                zoom: 11 // 初始化地图级别
            });
            map.on('click', function(ev: any) {

                //触发事件的地理坐标，AMap.LngLat 类型
                var lnglat = ev.lnglat;

                var geocoder = new AMap.Geocoder({
                    radius: 1000 //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
                });
                position = lnglat;
                geocoder.getAddress(new AMap.LngLat(lnglat.lng, lnglat.lat), (status: string, res: any) => {
                    if (status == 'complete') {
                        getWeather(AMap, map, res.regeocode.addressComponent.city || res.regeocode.addressComponent.province);
                    } else {
                        onError();
                    }
                });
            });
            getGeolocation(AMap);
            getCitySearch(AMap, map);
        });
    };
    useEffect(() => {
        createdMap();
        return () => {
            map?.destroy();
        };
    }, []);

    return (
        <div
            id="container"
            className={styles.container}
            style={{ height: '800px' }}
        ></div>
    );
}
