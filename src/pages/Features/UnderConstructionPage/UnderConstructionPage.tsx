import React from "react";
import { ReactComponent as SVG } from "img/bot-under-construction.svg";
import "./UnderConstructionPage.scss";

function UnderConstructionPage() {
  return (
    <div className="mt-5 mb-5">
      <div className="flex flex-col justify-content-center">
        <div className="flex flex-col text-center">
          <h3>Whoa easy there tiger!</h3>
          <p>
            This page is still under construction, but please make sure to come
            back at a later time :)
          </p>
          <a
            title="https://www.youtube.com/watch?v=Kt-tLuszKBA"
            href="https://www.youtube.com/watch?v=Kt-tLuszKBA"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            Here&apos;s a great mixtape while you wait
            {/* <Icon type="squareArrowUpRight" size="xxsmall" className="ml-1" /> */}
          </a>
        </div>
        <div className="mt-4 position-relative">
          <SVG id="under-construction" />
        </div>
      </div>
    </div>
  );
}

export default UnderConstructionPage;
