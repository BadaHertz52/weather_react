import React from "react";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer role="contentinfo">
      <span aria-details="the year of production">
        <span className="blind">the year of production</span>
        2023
      </span>
      <a
        href="https://github.com/BadaHertz52"
        rel="author"
        title="author github profile link"
      >
        <span className="blind">author's github profile link</span>
        ⓒbadahertz52
      </a>
      <a
        href="https://github.com/BadaHertz52/weather_react"
        title="github 바로가기"
      >
        <span className="blind">해당 페이지에 대한 github 페이지 바로가기</span>
        <BsGithub />
      </a>
    </footer>
  );
};

export default React.memo(Footer);
