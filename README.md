# Movie Man App

## General
![Ionic v3.9.2](https://img.shields.io/badge/Ionic-v3.9.2-green.svg)
![Cordova v7.x](https://img.shields.io/badge/Cordova-v7.x-green.svg)
![Build passing](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)
![Author metaphors](https://img.shields.io/badge/author-metaphors-blue.svg)

## ***GPL3 协议！！！切勿用于商业用途！！！***

## Build
```
git clone git@github.com:metaphors/MovieMan.git
cd MovieMan
npm install
sudo ionic cordova build ios --prod
sudo ionic cordova build android --prod
cd ..
sudo chmod -R 777 MovieMan
```

Android：  
`MovieMan/platforms/android/AndroidManifest.xml` 中 `android:windowSoftInputMode="adjustResize"` 修改为 `android:windowSoftInputMode="adjustPan|stateHidden"`

iOS：  
修改 `Localization native development region` 为 `China`

## Preview
<div>
	<img alt="home" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/home.jpg" width="24%"/>
	<img alt="movie1" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/movie1.jpg" width="24%"/>
	<img alt="movie2" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/movie2.jpg" width="24%"/>
	<img alt="trailer" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/trailer.jpg" width="24%"/>
	<img alt="cinema" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/cinema.jpg" width="24%"/>
	<img alt="login" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/login.jpg" width="24%"/>
	<img alt="profile" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/profile.jpg" width="24%"/>
	<img alt="dark theme" src="https://github.com/metaphors/MovieMan/raw/master/README_IMGS/dark_theme.jpg" width="24%"/>
</div>

## Thanks
[WildDog](https://www.wilddog.com)

[SM.MS](https://sm.ms)

[Animate.css](https://daneden.github.io/animate.css/)

[Videogular](https://videogular.github.io/videogular2/)
