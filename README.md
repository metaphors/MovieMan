# Movie Man App

## General
![Ionic v3.9.2](https://img.shields.io/badge/Ionic-v3.9.2-green.svg)
![Cordova v7.x](https://img.shields.io/badge/Cordova-v7.x-green.svg)
![Build passing](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)
![Author metaphors](https://img.shields.io/badge/author-metaphors-blue.svg)

## ***GPL3 协议！！！仅供学习！！！切勿用于商业用途！！！数据来源侵删！！！***

## Build
```
git clone git@github.com:metaphors/MovieMan.git
cd MovieMan
npm install
sudo ionic cordova platform add ios
sudo ionic cordova platform add android
sudo ionic cordova build ios --prod
sudo ionic cordova build android --prod
cd ..
sudo chmod -R 777 MovieMan
```

Android：  
`MovieMan/platforms/android/AndroidManifest.xml` 中 `android:windowSoftInputMode="adjustResize"` 修改为 `android:windowSoftInputMode="adjustPan|stateHidden"`

可解决Android端软键盘弹出后压缩界面的问题。

iOS：  
修改 `Localization native development region` 为 `China`

可解决iOS端Cordova插件文字为英文的问题。

## Preview
<div>
	<img alt="home" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/home.jpg" width="24%"/>
	<img alt="movie1" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/movie1.jpg" width="24%"/>
	<img alt="dark theme" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/dark_theme.jpg" width="24%"/>
	<img alt="movie2" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/movie2.jpg" width="24%"/>
	<img alt="information" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/information.jpg" width="24%"/>
	<img alt="login" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/login.jpg" width="24%"/>
	<img alt="profile" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/profile.jpg" width="24%"/>
	<img alt="trailer" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/trailer.jpg" width="24%"/>
	<img alt="cinema" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/cinema.jpg" width="24%"/>
	<img alt="data1" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/data1.jpg" width="24%"/>
	<img alt="data2" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/data2.jpg" width="24%"/>
	<img alt="data3" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/data3.jpg" width="24%"/>
</div>

## To Do List
[ ] feat: "数据"页-"更多日期"按钮对应的日期选择功能(日历)  
[ ] feat: 城市选择锚点滚动列表  
[ ] feat: 电影详情页(已有数据)  
[ ] feat: 影院详情页(已有数据)  
[ ] fix: "数据"页进入后图表无颜色  
[ ] feat: Skeleton Screen Loading  
[ ] feat: App 缓存

## Thanks
[WildDog](https://www.wilddog.com)

[SM.MS](https://sm.ms)

[Animate.css](https://daneden.github.io/animate.css/)

[Videogular](https://videogular.github.io/videogular2/)

[Chart.js](https://github.com/chartjs/Chart.js)

## Others
收款码还是要有的，万一有人给呢 ⁄(⁄ ⁄ ⁄ω⁄ ⁄ ⁄)⁄
<div>
	<img alt="Alipay" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/Alipay.JPG" width="30%"/>
</div>
<br/>
<div>
	<img alt="WeChatPay" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/WeChatPay.JPG" width="30%"/>
</div>
