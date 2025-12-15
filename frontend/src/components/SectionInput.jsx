import React, { useState, useEffect } from "react";

const SectionInput = ({ categories, onAddSection }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0] || "");

  useEffect(() => {
    if (categories.length > 0 && !categories.includes(category)) {
      setCategory(categories[0]);
    }
  }, [categories]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) return;
    onAddSection({ title: title.trim(), content: content.trim(), category });
    setTitle("");
    setContent("");
    setCategory(categories[0] || "");
  };

  return (
    <form onSubmit={handleAdd} className="space-y-4 text-white">
      <label className="block text-sm font-medium text-gray-300">Section Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      >
        {categories.length === 0 && <option value="" disabled>No Categories Available</option>}
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-300">Section Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Data Science Capstone Project"
        className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"        required
      />

      <label className="block text-sm font-medium text-gray-300">Section Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Describe your project, skills or experience"
        rows={4}
        className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indogo-700 transition"
        disabled={categories.length === 0}
      >
        Add Section
      </button>
    </form>
  );
};

export default SectionInput;
