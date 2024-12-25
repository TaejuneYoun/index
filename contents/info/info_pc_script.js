function initXR() {
  var nameOfDiv = "info_pc";
  var viewPortWidth = 1920;
  var viewPortHeight = 1080;
  var backgroundColor = "#FFFFFF";
  var uCount = 151; // 이미지의 수 (0_0.jpg ~ 0_150.jpg)
  var vCount = 1;
  var uWrap = true;
  var vWrap = false;
  var uMouseSensitivity = -0.209722;
  var vMouseSensitivity = 0.5;
  var uStartIndex = 75;
  var vStartIndex = 0;
  var minZoom = 1;
  var maxZoom = 2;
  var rotationDamping = 0.96;
  var downScaleToBrowser = true;
  var addDownScaleGUIButton = false;
  var downloadOnInteraction = false;
  var imageExtension = "jpg";
  var showLoading = true;
  var loadingIcon = "info_resize_01.png"; // Set to empty string for default icon.
  var allowFullscreen = true; // Double-click in desktop browsers for fullscreen.
  var uReverse = false;
  var vReverse = false;
  var hotspots = {};
  var isIBooksWidget = false;

  // 이미지 URL 생성 함수
  function getImageUrl(index) {
    const baseUrl = "https://raw.githubusercontent.com/TaejuneYoun/index/refs/heads/main/contents/info/animations/";
    return `${baseUrl}0_${index}.${imageExtension}`;
  }

  // 이미지 URL 리스트 생성
  var imageUrls = [];
  for (var i = 0; i < uCount; i++) {
    imageUrls.push(getImageUrl(i));
  }

  // XR 객체 생성 (이미지 URL 리스트를 사용)
  XR = new XR(
    nameOfDiv,
    imageUrls, // 이미지 URL 리스트 전달
    viewPortWidth,
    viewPortHeight,
    backgroundColor,
    uCount,
    vCount,
    uWrap,
    vWrap,
    uMouseSensitivity,
    vMouseSensitivity,
    uStartIndex,
    vStartIndex,
    minZoom,
    maxZoom,
    rotationDamping,
    downScaleToBrowser,
    addDownScaleGUIButton,
    downloadOnInteraction,
    imageExtension,
    showLoading,
    loadingIcon,
    allowFullscreen,
    uReverse,
    vReverse,
    hotspots,
    isIBooksWidget
  );
}
