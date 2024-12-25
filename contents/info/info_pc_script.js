var XR;

function initXR() {
  var nameOfDiv = "info_pc";
  var folderName = "animations";
  var viewPortWidth = 1920;
  var viewPortHeight = 1080;
  var backgroundColor = "#FFFFFF";
  var uCount = 151;
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
  
  XR = new XR(nameOfDiv,folderName,viewPortWidth,viewPortHeight,backgroundColor,uCount,vCount,uWrap,vWrap,uMouseSensitivity,vMouseSensitivity,uStartIndex,vStartIndex,minZoom,maxZoom,rotationDamping,downScaleToBrowser,addDownScaleGUIButton,downloadOnInteraction,imageExtension,showLoading,loadingIcon,allowFullscreen,uReverse,vReverse,hotspots,isIBooksWidget);
}

window.onload = initXR;