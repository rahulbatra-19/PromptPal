"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSearchParams } from "next/navigation";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const handleTagClickfunc = (tag) => {
    setSearchText(tag);
  };
  const handleSearch = () => {};
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    const fetchPostBasedOnSearch = () => {
      setPosts(filterPrompts(searchText));
    };
    if (searchText === "") fetchPosts();
    else fetchPostBasedOnSearch();
  }, [searchText]);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          onSubmit={handleSearch}
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClickfunc} />
    </section>
  );
};

export default Feed;
