import { useEffect, useRef } from 'react';

function loadNextSceneImage(
  newImgUrl: string,
  storylineSceneryImg: HTMLDivElement,
) {
  // We do this so we can load image into cash before rerendering,
  // so we can avoid flashing blank image.
  const img = new Image();
  img.src = newImgUrl;

  img.onload = () => {
    // rerun animation.
    storylineSceneryImg.style.animation = '';
    storylineSceneryImg.style.animationName = 'none';
    requestAnimationFrame(() => {
      storylineSceneryImg.style.animation =
        'fade 350ms ease forwards, lightPuls 5s cubic-bezier(0.7, 0.6, 0.6, 0.6) infinite';
      // Replace old scene image with new scene image
      storylineSceneryImg.style.backgroundImage = `url(${img.src})`;
    });
  };
}

export function StoryScenery({ imgSrc }: { imgSrc: string }) {
  const sceneryDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (sceneryDiv.current) {
        sceneryDiv.current.style.backgroundImage = imgSrc;
      }
    });
  }, [imgSrc]);

  useEffect(() => {
    if (sceneryDiv.current) {
      loadNextSceneImage(imgSrc, sceneryDiv.current);
    }
  }, [imgSrc]);

  return (
    <div
      id="storylineSceneryDiv"
      className="d-flex justify-content-center p-0 col-12 col-lg-8"
    >
      <div
        id="storylineSceneryImg"
        ref={sceneryDiv}
        className="w-100 background-image-animate"
      />
    </div>
  );
}
export default StoryScenery;
