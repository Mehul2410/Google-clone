import React from "react";
import { useStateValue } from "../components/StateProvider";
import useGoogleSearch from "../components/useGoogleSearch";
import Response from "../components/response";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import Search from "./Search";
import {
  DescriptionRounded,
  LocalOfferOutlined,
  MoreVertRounded,
  SearchRounded,
  RoomRounded,
} from "@material-ui/icons";
import ImageIcon from "@material-ui/icons/Image";

const SearchPage = () => {
  const [{ term = "tesla" }, dispatch] = useStateValue();

  const { data } = useGoogleSearch(term);
  //Mock API Call
  //const data = Response;

  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://www.google.com/logos/doodles/2020/wear-a-mask-save-lives-aug-5-copy-6753651837108822-law.gif"
          />
        </Link>

        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchRounded />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__option">
                <DescriptionRounded />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage__option">
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__option">
                <LocalOfferOutlined />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage__option">
                <RoomRounded />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreVertRounded />
                <Link to="/more">more</Link>
              </div>
            </div>

            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>

          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="searchPage__resultImage"
                      src={item.pagemap?.cse_image[0]?.src}
                    />
                  )}
                {item.displayLink} 🔻
              </a>
              <a className="searchPage__resultTitle" href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
