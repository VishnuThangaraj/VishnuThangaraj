import { useState } from "react";
import { profile } from "../data/profile";
import { Search } from "lucide-react";

export const StackApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Object.keys(profile.skills)];

  const getFilteredSkills = () => {
    let result = [];
    Object.entries(profile.skills).forEach(([category, items]) => {
      if (selectedCategory === "All" || selectedCategory === category) {
        items.forEach((item) => {
          if (item.toLowerCase().includes(searchQuery.toLowerCase())) {
            result.push({ name: item, category });
          }
        });
      }
    });
    return result;
  };

  const filtered = getFilteredSkills();
  const totalCount = Object.values(profile.skills).flat().length;

  return (
    <div className="flex flex-col h-full min-h-[460px] select-text">
      {/* Top filter bar */}
      <div className="p-4 border-b border-white/10 bg-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>

        <div className="text-xs text-gray-400 font-mono">
          Showing <span className="text-amber-300 font-bold">{filtered.length}</span> of{" "}
          <span className="text-white font-bold">{totalCount}</span> skills
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Categories Sidebar */}
        <div className="w-52 border-r border-white/10 p-3 bg-black/5 shrink-0 select-none overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1 mb-1">
            Collections
          </div>
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? totalCount
                : profile.skills[cat]?.length || 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-medium flex items-center justify-between transition-colors mb-1 ${
                  isSelected
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >
                <span className="truncate">{cat}</span>
                <span className="text-[10px] font-mono opacity-60 bg-white/10 px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all flex flex-col justify-between"
              >
                <div className="text-sm font-semibold text-white">
                  {skill.name}
                </div>
                <div className="text-[10px] font-mono text-amber-400/80 mt-2 truncate">
                  {skill.category}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-xs">
              No skills match your search "{searchQuery}" in {selectedCategory}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
