import { useState, useRef } from "react";

export default function SearchInput({
  placeholder = "Search headphones...",
  onSearch,
  onClear,
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch?.(val);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClear();
  };

  return (
    <div
      className={`flex items-center gap-3 w-full bg-white border rounded-full px-4 py-2.5 transition-all duration-200 ${
        focused
          ? "border-gray-900 shadow-sm"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Search icon */}
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        className={`flex-shrink-0 transition-colors ${
          focused ? "text-gray-900" : "text-gray-400"
        }`}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4-4" />
      </svg>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={handleClear}
          className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          aria-label="Clear search"
        >
          <svg
            width="10"
            height="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            className="text-gray-600"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}