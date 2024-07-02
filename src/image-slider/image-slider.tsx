import React, { useState, useEffect } from 'react';
import './image-slider.css';

const WIDTH = 400;
const HEIGHT = 400;
const MAX = 5;

enum Direction {
  LEFT,
  RIGHT,
}

export function ImageSlider() {
  const [images, setImages] = useState([] as string[]);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    const fetchImages = async () => {
      const promises = [];
      for (let i = 0; i < MAX; i++) {
        promises.push(
          fetch(`https://picsum.photos/400?random=${i + 1}`, {
            headers: { 'Content-Type': 'application/json' },
          })
        );
      }
      const resolved = await Promise.allSettled(promises);
      const imgArray: string[] = resolved.map((response) => {
        if (response.status === 'fulfilled' && response.value.url) {
          return response.value.url;
        }
        return '';
      });
      if (imgArray) {
        setImages(imgArray);
      }
    };

    fetchImages();
    setSelected(0);
  }, []);

  const changeImage = (direction: Direction) => {
    if (direction === Direction.LEFT) {
      setSelected(selected - 1 >= 0 ? selected - 1 : 0);
    } else {
      setSelected(
        selected + 1 < images.length ? selected + 1 : images.length - 1
      );
    }
  };

  const circles = () => {
    const circle = (index: number) => {
      const totalOffset = 133 + 30 * index;
      const isSelected = index === selected;
      let classNames = 'circle';
      if (isSelected) {
        classNames += ' circle_selected';
      }
      return (
        <span
          key={index}
          style={{ left: `${totalOffset}px` }}
          className={classNames}
          onClick={() => setSelected(index)}
        ></span>
      );
    };

    return images.map((el: string, index: number) => circle(index));
  };

  return (
    <div className="container">
      <div
        className="arrow_container"
        onClick={() => changeImage(Direction.LEFT)}
      >
        <i className="arrow left" />
      </div>
      <div className="image_container">
        {selected > -1 ? (
          <img
            src={images[selected]}
            width={WIDTH}
            height={HEIGHT}
            alt="some image"
          />
        ) : null}
        <div className="overlay">{circles()}</div>
      </div>
      <div
        className="arrow_container"
        onClick={() => changeImage(Direction.RIGHT)}
      >
        <i className="arrow right" />
      </div>
    </div>
  );
}
