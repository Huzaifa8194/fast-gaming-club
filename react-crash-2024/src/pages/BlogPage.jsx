import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "The Future of Gaming: Trends to Watch",
    author: "Jane Doe",
    date: "2024-08-01",
    content: "Gaming is constantly evolving with new trends emerging every year. In this blog, we explore the top trends to watch in the gaming industry, including virtual reality, augmented reality, and cloud gaming. The future of gaming looks exciting with these cutting-edge technologies leading the way."
  },
  {
    id: 2,
    title: "Top 10 Games of 2024 You Must Play",
    author: "John Smith",
    date: "2024-08-03",
    content: "As we move through 2024, there are several standout games that every gamer should try. From action-packed adventures to immersive RPGs, this blog lists the top 10 games that are making waves this year. Don't miss out on these must-play titles that are setting new standards in gaming."
  },
  {
    id: 3,
    title: "How to Build Your Own Gaming PC: A Step-by-Step Guide",
    author: "Alex Johnson",
    date: "2024-08-05",
    content: "Building your own gaming PC can be a rewarding experience. In this comprehensive guide, we walk you through the process of selecting the right components, assembling your PC, and optimizing it for the best gaming performance. Get ready to enjoy your custom-built gaming rig."
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-stone-800 text-white p-6">
      <div className="max-w-3xl mx-auto bg-stone-700 rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Gaming Blogs</h1>
        {blogs.map(blog => (
          <div key={blog.id} className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-300 mb-1">By {blog.author} on {blog.date}</p>
            <p className="text-gray-300 mb-2">{blog.content}</p>
          </div>
        ))}
        <div className="text-right">
          <Link
            to="/"
            className="bg-red-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
